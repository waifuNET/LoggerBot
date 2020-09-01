const fs = require('fs');
const db = require('sqlite-sync');

db.connect('logs/database.sqlite3.db');

/**
 * Creates tables necessary for work.
 */
function create_tables(){
    let command = fs.readFileSync('myModules/create_tables.sql', 'utf8');
    db.run(command);
}


// From all
function get_objects_by(table, field){
    let res = db.run("SELECT * FROM " + table);
    return res;
}


// Messages code

function get_messages_by(field){
    let res = db.run("SELECT * FROM messages");
    return res;
}

function save_message(channel_name, server_name, content, human_time, utc, utc_offset,
                      author_id, author_username, discriminator, message_type){
    db.run(`INSERT INTO messages(channel_name, server_name, content, human_time,
            utc, utc_offset, author_id, author_username, discriminator, message_type)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                channel_name, // string
                server_name, // string
                content, // string
                human_time, // string
                utc, // integer
                utc_offset, // integer
                author_id, // integer
                author_username, // string
                discriminator, // string
                message_type // string
	    ]) }

//////////////////////////////////////////////

// Channels code

function get_channels_by(field){
    let res = db.run("SELECT * FROM channels");
    return res;
}

function save_channel(channel_name, server_name, human_time, utc, utc_offset,
    author_id, author_username, discriminator, channel_type, channel_event){
    db.run(`INSERT INTO channels(channel_name, server_name, human_time,
    utc, utc_offset, author_id, author_username, discriminator, channel_type, channel_event)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            channel_name, // string
            server_name, // string
            human_time, // string
            utc, // integer
            utc_offset, // integer
            author_id, // integer
            author_username, // string
            discriminator, // string
            channel_type, // string
            channel_event // string
        ])
}

//////////////////////////////////////////////
function close() { db.close(); }

exports.create_tables = create_tables;
exports.save_message = save_message;
exports.get_messages_by = get_messages_by;
exports.save_channel = save_channel;
exports.get_channels_by = get_channels_by;
exports.close = close;

// Чтение
// console.log(get_objects_by('messages', 'id'));
// console.log(get_objects_by('channels', 'channel_name'));

// Запись
// save_message('channel', 'server', 'content', 'time', 123, 321, 1, 'author_username', 'discriminator', 'message_type');
// save_channel('chnnl', 'servr', 1970, 197000, 6, 1, 'usrname', 'kek', 'type', 'event');
