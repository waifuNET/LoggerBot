const Discord = require('discord.js');
var database = require("../myModules/database.js");
const fs = require('fs');

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
    let pars = parseInt(args[0], 10);
    if(args[0] == exports.cfg.help)
        msg.channel.send(help_text);
    else{
        let result = "";
        let border = "=========================" + "\n";
        database.get_messages_by('id').forEach(element => {
            let channel    = "channel: "    + element.channel_name    + "\n";
            let content    = "content: "    + element.content         + "\n";
            let username   = "username: "   + element.author_username + "\n";
            let human_time = "human time: " + element.human_time      + "\n";

            result += border + channel + content + username + human_time;
        });
        result += border;
        msg.channel.send(result);
    }
}

