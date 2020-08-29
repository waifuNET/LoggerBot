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
            ])
}

function close() { db.close(); }

exports.create_tables = create_tables;
exports.get_messages_by = get_messages_by;
exports.save_message = save_message;

// Чтение
// get_messages_by('id').forEach(msg => {
//     console.log(msg.id);
//     console.log(msg.content);
// });

// Запись
// save_message('channel', 'server', 'content', 'time', 123, 321, 1, 'author_username', 'discriminator', 'message_type')
