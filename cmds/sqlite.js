const Discord = require('discord.js');
var database = require("../myModules/database.js");
const fs = require('fs');
const { Agent } = require('http');

let help_text = 
`
/help/
`;

exports.cfg = {
    command: "sqlite",
    help: "help",
    run: run
};

async function run(logger, msg, args){
    console.log("run =>" + msg.content);
    let count = 0;
    let limit = 3;
    if(args.length >= 2){
        limit = parseInt(args[1], 10);
    }
    if(args[0] == exports.cfg.help)
        msg.channel.send(help_text);
    else if(args[0] == "channel"){
        let result = "";
        let border = "=========================" + "\n";
        database.get_objects_by('channels', 'id').forEach(element => {
            if(count >= limit) return;
            let channel    = "channel: "    + element.channel_name    + "\n";
            let event      = "event: "      + element.channel_event   + "\n";
            let username   = "username: "   + element.author_username + "\n";
            let human_time = "human time: " + element.human_time      + "\n";

            result += border + channel + event + username + human_time;
            count++;
        });
        result += border;
        msg.channel.send(result);
    }
    else{
        let result = "";
        let border = "=========================" + "\n";
        database.get_objects_by('messages', 'id').forEach(element => {
            if(count >= limit) return;
            let channel    = "channel: "    + element.channel_name    + "\n";
            let content    = "content: "    + element.content         + "\n";
            let username   = "username: "   + element.author_username + "\n";
            let human_time = "human time: " + element.human_time      + "\n";

            result += border + channel + content + username + human_time;
            count++;
        });
        result += border;
        msg.channel.send(result);
    }
}

