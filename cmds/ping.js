let help_text = 
`
The "!ping" command is used for testing.
If you see it, everything is working correctly.
`;

/**
 * export.cfg must be present in all command files.
 * The run function must also be present (it runs if the command from exports.cfg.command was entered).
 */

exports.cfg = {
    command: "ping",
    help: "help",
    run: run
};

/**
 * The run function is executed if the user writes a command from exports.cfg.command.
 */
function run(logger, msg, args){
    console.log("run =>" + msg.content);
    if(args[0] == exports.cfg.help)
        msg.channel.send(help_text);
    else if(args.length == 0)
        msg.channel.send('pong');
    else
        msg.channel.send("Invalid argument."); 
}
