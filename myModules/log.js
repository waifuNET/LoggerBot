const fs = require('fs');
let cfg = require('../cfg.json');

var list = [];
exports.log_list = list;

var st_log = {
    channel_name: "",
    server_name: "",
    content: "",
    human_time: "",
    utc: "",
    utc_offset: "",
    author_id: "",
    author_username: "",
    discriminator: "",
}

function loadNowDateJson(time){
    let dir = "./logs/";
    let file = dir + time.getHumanOnlyDateFormat(time.utc) + ".json";
    if (fs.existsSync(file)) {
        try {
            let data = fs.readFileSync(file, 'utf8')
            list = JSON.parse(data);
            exports.log_list = list;
        } catch (err) {
            console.error(err);
        }
    }

    console.log("logs loaded:" + list.length);
}

exports.loadNowDateJson = loadNowDateJson;

function addLog(logger, msg, time){
    let dir = "./logs/";
    let file = dir + time.getHumanOnlyDateFormat(time.utc) + ".json";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    list.push({ 
        channel_name: msg.channel.name,
        server_name: msg.channel.guild.name,
        content: msg.content,
        human_time: time.getHumanDateFormatWithOffset(time.utc, cfg.utc_offset),
        utc: time.utc,
        utc_offset: cfg.utc_offset,
        author_id: msg.author.id,
        author_username: msg.author.username,
        discriminator: msg.author.discriminator,
    });

    fs.writeFile(file, JSON.stringify(list), "utf8", function (err,data) {
        if (err) {
            return console.log(err);
        }
    });
    exports.log_list = list;
}

exports.addLog = addLog;