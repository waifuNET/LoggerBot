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


// From all objects
function get_objects_by(table, field){
    let res = db.run("SELECT * FROM " + table);
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


function save_guild(server_name, human_time, utc, utc_offset,
    	executor_id, executor_username, target_id, target_username, target_discriminator, action, reason){
    db.run(`INSERT INTO guilds(server_name, human_time, utc, utc_offset,
    executor_id, executor_username, target_id, target_username, target_discriminator, action, reason)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
		server_name, // string
		human_time, // string
		utc, // int
		utc_offset, // int
		executor_id, // int
		executor_username, // string
		target_id, // int
		target_username, // string
		target_discriminator, // int
		action, // string
		reason, // string | null
        ])
}


function close() { db.close(); }


exports.create_tables = create_tables;
exports.save_message = save_message;
exports.get_objects_by = get_objects_by;
exports.save_channel = save_channel;
exports.close = close;

// Чтение
// console.log(get_objects_by('messages', 'id'));
// console.log(get_objects_by('channels', 'channel_name'));
console.log(get_objects_by('guilds', 'id'));

// Запись
// save_message('channel', 'server', 'content', 'time', 123, 321, 1, 'author_username', 'discriminator', 'message_type');
// save_channel('chnnl', 'servr', 1970, 197000, 6, 1, 'usrname', 'kek', 'type', 'event');
save_guild('server', 't', 1, 2, 3, 'eu', 4, 'tu', 5, 'a', null);

