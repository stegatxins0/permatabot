// const sqlite3 = require('sqlite3')
const sqlite3 = require('sqlite3')
db = new sqlite3.Database('./assignment.db')
const moment = require('moment')
module.exports = {
    name: 'list',
    description: "list assignment with .list *user*",
    execute(message, args){
        user = args[0];
        function sq_get(table, callback){
            db.serialize(() => {
                db.each(`SELECT * FROM ${table} ORDER BY time`,function(err,rows){
                    if (err){
                        console.log(err);
                        message.channel.send("Who are you again?")
                    }else{
                        callback(rows);
                    }
                });
            });
        }
        function callparse(list){
            // friendlydate = list.time.fromNow();
            message.channel.send(`**${moment(list.time, 'YYYY-MM-DD hh:mm').fromNow()}** | *${list.time}* ➤ ${list.assignment}`) 
        }
        if (user){sq_get(user, callparse)}else{message.channel.send("Please insert username as argument, eg: .list thisismyname")}
    }
}
