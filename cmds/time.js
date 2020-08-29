const Discord = require('discord.js');
var time = require("../myModules/time.js");
let cfg = require('../cfg.json');

let help_text = 
`
/help/
`;

exports.cfg = {
    command: "time",
    help: "help",
    run: run
};

async function run(logger, msg, args){
    console.log("run =>" + msg.content);
    if(args.length > 1){
        let pars = parseInt(args[1], 10);
        if(pars)
            msg.channel.send(time.getHumanDateFormatWithOffset(time.utc, pars * -1));
        else
            msg.channel.send("The two parameter must be a number.");
    }
    else if(args[0] == "utc")
        msg.channel.send(time.getHumanDateFormat(time.utc));
    else if(args[0] == "_fdate")
        msg.channel.send(time.getHumanOnlyDateFormat(time.utc));
    else
        msg.channel.send(time.getHumanDateFormatWithOffset(time.utc, cfg.utc_offset))
}
