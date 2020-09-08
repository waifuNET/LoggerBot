const Discord = require('discord.js');
const logger = new Discord.Client();

var time = require("./myModules/time.js");
var log = require("./myModules/log.js");
var database = require("./myModules/database.js");

const fs = require('fs');
let cfg = require('./cfg.json');

/**
 * Timer for date refresh.
 */
setInterval(time.time_update, 1000);

let commands = [];

console.log(time.getHumanDateFormat(time.utc));

/**
 * Reads all files with the "js" extension, then reads them and adds them to commands.
 */
fs.readdir('./cmds/', (error, files) =>{
  if(error) comsole.log(error);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) console.log("Commands not found.");
  else{
    console.log(`Loaded ${jsfile.length} commands.`);
    jsfile.forEach((file, i) =>{
      try{
      let props = require(`./cmds/${file}`);
      console.log(`${i + 1} ${file} loaded.`);
      commands.push
      (
        {
          command: props.cfg.command,
          help: props.cfg.help,
          run: props.cfg.run
        }
      );
      }catch (e){
        console.error(`${file}: File reading error, it may contain the required parameters`);
      }
    })
  }
});

//log.loadNowDateJson(time);

/**
 * Event handlers.
 * Output a link to the console to invite the bot to the server.
 * Called when the bot is running and ready.
 */
logger.on('ready', () => {
  console.log("Logger launched!");
  logger.generateInvite(["ADMINISTRATOR"]).then(link => {
    console.log(link);
  });
});

/**
 * Called when the bot receives a message or when users post something in the channel.
 */
logger.on('message', async msg => {
  if(msg.channel.type == "dm") return;
  if(msg.author.bot) return;
  //log.addLog(logger, msg, time); //save in json
  
  database.save('messages',
 {
     'message_type': msg.type,
     'channel_name': msg.channel.name,
     'server_name': msg.channel.guild.name,
     'content': msg.content,
     'human_time': time.getHumanDateFormatWithOffset(time.utc, cfg.utc_offset * -1),
     'utc': time.utc,
     'utc_offset': cfg.utc_offset,
     'author_id': msg.author.id,
     'author_username': msg.author.username,
     'discriminator': msg.author.discriminator
 }
)

  if(!msg.content.startsWith(cfg.prefix)) return;
  let messageArray = msg.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  let result = commands.filter(x => cfg.prefix + x.command == command)[0];
  if(result){
    result.run(logger, msg, args);
  }
});

/**
 * Called when someone creates a channel.
 */
logger.on("channelCreate", async channel => {
  channel_event(channel, "create");
});

logger.on("channelDelete", async channel => {
  channel_event(channel, "delete");
});

logger.on("channelUpdate", async channel => {
  channel_event(channel, "update");
});

logger.on('guildBanAdd', async (guild, user) => {
  guild_event(guild, user, "MEMBER_BAN_ADD");
});

logger.on('guildBanRemove', async (guild, user) => {
  guild_event(guild, user, "MEMBER_BAN_REMOVE");
});

/*
logger.on('guildDelete', async (guild, user) => {
  guild_event(guild, user, "GUILD_DELETE");
});

logger.on('guildUpdate', async (guild, user) => {
  guild_event(guild, user, "GUILD_UPDATE");
});
*/

async function channel_event(channel, event){
  if (!channel.guild) return false;
  console.log(`channel ${event}. id: ` + channel.id);
  const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: `CHANNEL_${event.toUpperCase()}`});
  const channelLog = AuditLogFetch.entries.first();
  if (!channelLog) return console.log(`The channel was ${event}, but no relevant audit logs were found.`);
  const { executor, target } = channelLog;

  database.save('channels',
    {
      'channel_type': channel.type,
      'channel_name': channel.name,
      'server_name': channel.guild.name,
      'human_time': time.getHumanDateFormatWithOffset(time.utc, cfg.utc_offset * -1),
      'utc': time.utc,
      'utc_offset': cfg.utc_offset,
      'author_id': executor.id,
      'author_username': executor.username,
      'author_discriminator': executor.discriminator,
      'channel_event': event
    }
  )

}

async function guild_event(guild, user, event){
  const AuditLogFetch = await guild.fetchAuditLogs({limit: 1, type: event});
  const Log = AuditLogFetch.entries.first();
  if (!Log) return console.log(`${user.tag} was ${event} from ${guild.name} but no audit log could be found.`);
  const { executor, target } = Log;
  console.log(`User: ${executor.tag} ${event} on ${target.tag} in ${guild.name}.`);

  database.save('guilds',
  {
    'server_name': guild.name,
    'human_time': time.getHumanDateFormatWithOffset(time.utc, cfg.utc_offset * -1),
    'utc': time.utc,
    'utc_offset': time.utc_offset,
    'executor_id': executor.id,
    'executor_username': executor.username,
    'executor_discriminator': executor.discriminator,
    'target_id': target.id,
    'target_username': target.username,
    'target_discriminator': target.discriminator,
    'guild_action': Log.action,
    'guild_reason': Log.reason
  }
)

/*
  console.log("guild.name:" + guild.name);
  console.log("Log.action:" + Log.action);
  console.log("Log.reason:" + Log.reason);
  console.log("executor.id:" + executor.id);
  console.log("executor.username:" + executor.username);
  console.log("executor.discriminator:" + executor.discriminator);
  console.log("target.id:" + target.id);
  console.log("target.username:" + target.username);
  console.log("target.discriminator:" + target.discriminator);
  console.log("guild.name:" + guild.name);
  */
}

/**
 * Authorizes the bot through a token.
 */
logger.login(cfg.token);
