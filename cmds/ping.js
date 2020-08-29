const Discord = require('discord.js');
const fs = require('fs');

let help_text = 
`
The "!ping" command is used for testing.
If you see it, everything is working correctly.
`;

exports.cfg = {
    command: "ping",
    help: "help",
    run: run
};

async function run(logger, msg, args){
    console.log("run =>" + msg.content);
    if(args.length > 0)
        msg.channel.send("Invalid argument."); 
    if(args[0] == exports.cfg.help)
        msg.channel.send(help_text);
    else
        msg.channel.send('pong');
}
