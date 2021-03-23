// const sqlite3 = require('sqlite3')
const sqlite3 = require('sqlite3')
db = new sqlite3.Database('./assignment.db')
const moment = require('moment')
module.exports = {
    name: 'add',
    description: "add assignment with .add *user* *date* *assignment*",
    execute(message, args){
        function err(){message.channel.send("Invalid date. Do not have space in between date.")}
        user = args[0];
        subject = args.slice(2).join(" ");
        date = moment(args[1]).set({"year": 2021});
        function sqlite_add(username,masterlist){
            db.run(`CREATE TABLE IF NOT EXISTS ${username} (time DATETIME, assignment TEXT, checkremind INTEGER)`,function(err){
                if (err){
                    console.log(err)
                    message.channel.send("This is a sqlite3 error. If you are a developer, please check console for more details.")
                }else{
                    db.run(`INSERT INTO ${username} (time, assignment) VALUES (?, ?)`, masterlist);
                    message.channel.send(`Assignment for ${username} added.`)
                }
            })
        }
        function add(){
            if (moment(date).format('HH:mm') == "00:00") {date = date.set({"hour": 23, "minute": 59});}
            masterlist = [date.format('YYYY-MM-DD HH:mm'), subject]
            userlist = []
            if (user == "all"){ userlist.push("jack", "cw", "aqil")
            }else if (user == "moral"){ userlist.push("jack", "cw")
            }else if (user == "jack"){ userlist.push("jack")
            }else if (user == "aqil"){ userlist.push("aqil")
            }else if (user == "cw"){ userlist.push("cw")}
            if (userlist.length == 0){message.channel.send("Who are you? Your name is invalid")}else{
            for (usersin in userlist){
                sqlite_add(userlist[usersin], masterlist)
            }
            }
        }
        if (user){if (date.isValid() && subject){add()}else{err()}}else{message.channel.send("add assignment with .add *user* *date* *assignment*")}
    }
}
