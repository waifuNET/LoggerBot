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

database.create_tables();

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

log.loadNowDateJson(time);

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
  log.addLog(logger, msg, time); //save in json

  database.save_message( //save in sqlite
  msg.channel.name,
  msg.channel.guild.name,
  msg.content,
  time.getHumanDateFormatWithOffset(time.utc, cfg.utc_offset),
  time.utc, cfg.utc_offset,
  msg.author.id,
  msg.author.username,
  msg.author.discriminator,
  msg.channel.type);

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

async function channel_event(channel, event){
  if (!channel.guild) return false;
  console.log(`channel ${event}. id: ` + channel.id);
  //console.log(channel);
  const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: `CHANNEL_${event.toUpperCase()}`});
  const channelLog = AuditLogFetch.entries.first();
  if (!channelLog) return console.log(`The channel was ${event}, but no relevant audit logs were found.`);
  const { executor, target } = channelLog;
  console.log(executor.username);
  
  //executor.id
  //executor.username
  //executor.discriminator
}

/**
 * Authorizes the bot through a token.
 */
logger.login(cfg.token);
