module.exports = {
    name: 'upd',
    description: "this is a upd command!",
    execute(db, moment, message, args, Discord, client){
        function sq_get(table, callback, yes){
            if (yes){db.serialize(() => {
                db.each(`SELECT rowid,* FROM ${table} WHERE rowid=${yes} ORDER BY time`,function(err,rows){
                    if (err){
                        console.log(err);
                    }else{
                        callback(rows, table);
                    }
                });
            });
            }else{
            db.serialize(() => {
                db.each(`SELECT rowid,* FROM ${table} ORDER BY time`,function(err,rows){
                    if (err){
                        console.log(err);
                        message.channel.send("`ERROR: LIST SQLITE ERROR` Please contact developer")
                    }else{
                        callback(rows, table);
                    }
                });
            });
            }
        }
        function sq_add(username, masterlist){
            db.run(`CREATE TABLE IF NOT EXISTS ${username} (time DATETIME, assignment TEXT, details TEXT)`,function(err){
                if (err){
                    console.log(err);
                    message.reply("`ERROR: SQLITE ERROR` Please contact developer")
                }else{
                    db.run(`INSERT INTO ${username} (time, assignment, details) VALUES (?, ?, ?)`, masterlist);
                }
            })
        }
        cur = 0
        mesg = ""
        // user = args[0];
        function msd(rows, ntable){
            newtable = [rows.time, rows.assignment, rows.details]
            sq_add(`completed_${ntable}`, newtable)
            db.run(`DELETE FROM '${ntable}' WHERE rowid='${rows.rowid}'`, function(err){
            if (err){
                console.log(err)
            }else {
                return;
            }})
        }
        function callparse(list, table){
            if (moment(list.time, 'YYYY-MM-DD hh:mm').diff(moment()) < 0){
                sq_get(table, msd, list.rowid)
            }
        }
        db.each(`SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%';`,function(err, rows){
            if (err){
                console.log(err);
                // message.reply("`ERROR: SQLITE ERROR` Please contact developer")
            }else{
                // db.run(`INSERT INTO ${username} (time, assignment, details) VALUES (?, ?, ?)`, masterlist);
                // console.log(rows.name)
                // console.log(rows["name"])
                sq_get(rows.name, callparse)
            }
        })
        // sq_get(``, callparse)
    }
}
