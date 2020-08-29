const Discord = require('discord.js');
const logger = new Discord.Client();

var time = require("./myModules/time.js");
var log = require("./myModules/log.js");

const fs = require('fs');
let cfg = require('./cfg.json');

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
  if(msg.author.bot) return;
  log.addLog(logger, msg, time);
  if(msg.channel.type == "dm") return;
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
  if (!channel.guild) return false;
  console.log("created new channel. id: " + channel.id);
});

/**
 * Authorizes the bot through a token.
 */
logger.login(cfg.token);
