const Discord = require('discord.js');
const logger = new Discord.Client();

var time = require("./myModules/time.js");
var log = require("./myModules/log.js");

const fs = require('fs');
let cfg = require('./cfg.json');

let commands = [];

console.log(time.getHumanDateFormat(time.utc));

fs.readdir('./cmds/', (error, files) =>{
  if(error) comsole.log(error);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) console.log("Commands not found.");
  else{
    console.log(`Loaded ${jsfile.length} commands.`);
    jsfile.forEach((file, i) =>{
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
    })
  }
});

log.loadNowDateJson(time);

logger.on('ready', () => {
  console.log("Logger launched!");
  logger.generateInvite(["ADMINISTRATOR"]).then(link => {
    console.log(link);
  });
});

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

logger.on("channelCreate", async channel => {
  if (!channel.guild) return false;
  console.log("created new channel. id: " + channel.id);
});

logger.login(cfg.token);
