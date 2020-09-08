const fs = require('fs');
const db = require('sqlite-sync');

db.connect('logs/database.sqlite3.db');

// From all objects
function get_objects_by(table, field='id'){
    return db.run(`SELECT * FROM ${table} ORDER BY ${field} DESC`);
}


// Save to database any object.
function save(table_name, fields_values){
    // Get fields and values comma separated.
    var fields = Object.keys(fields_values).join(", ");
    var values = Object.values(fields_values).join(', ');

    // ? lenght == fields_values lenght.
    var qs = [];
    for (var i in fields_values){
        qs.push('?');
    }
    // ? comma separated.
    qs = qs.join(', ');

    // Copy values to simple array.
    values = Object.values(fields_values);
    var vals = [];
    for (var i = 0; i < values.length; i++){
        vals.push(values[i]);
    }
    
    // Create table command.
    create_table_cmd = `CREATE TABLE IF NOT EXISTS ${table_name}
        (id INTEGER PRIMARY KEY AUTOINCREMENT, ${fields})`;
    
    // Save command.
    var save_cmd = `INSERT INTO ${table_name}(${fields})
        VALUES(${qs})`;

    // Run commands.
    db.run(create_table_cmd);
    db.run(save_cmd, vals);
}


exports.get_objects_by = get_objects_by;
exports.save = save;


// Чтение
// console.log(get_objects_by('table_name', 'field_name'));

// Запись
// save('messages',
//         {
//             'channel': 'chnl',
//             'server': 'srver',
//             'contnent': 'cntnt',
//             'human_time': 'time',
//             'utc': 1,
//             'utc_offset': 2,
//             'author_id': 3,
//             'author_username': 'username',
//             'discriminator': 'disc',
//             'message_type': 'type'
//         }
//     )
