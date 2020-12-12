const sqlite3 = require('sqlite3')
db = new sqlite3.Database('./assignment.db')
const delay = ms => new Promise(res => setTimeout(res, ms));
module.exports = {
    sq_add: function sq_add(id, list){
        db.run(`CREATE TABLE IF NOT EXISTS user${id} (time DATETIME, assignment TEXT, checkremind INTEGER)`,function(err){
            if (err){
                console.log(err)
            } else{
                db.run(`INSERT INTO user${id} (time, assignment) VALUES (?, ?)`, list);
            }
        });
        // db.run(`CREATE TABLE IF NOT EXISTS user123 (time DATETIME, assignment TEXT, check INTEGER)`)
        // , function(err){
        //     !err && db.run(`INSERT INTO user${id} (time, assignment) VALUES (?, ?)`, list)
        // })
    },
    sq_get: function sq_get(table, callback){
        db.serialize(() => {
            db.each(`SELECT * FROM ${table} ORDER BY time`,function(err,rows){
                if (err){
                    console.log(err);
                }else{
                    callback(rows);
                }
            });
        });
    },
    sq_update: function(table, time, assignment, value){
        db.run(`UPDATE '${table}' SET checkremind=${value} WHERE time='${time}' AND assignment="${assignment}"`);
        // console.log("hi")
    },
    sq_delete: function(table, time, assignment){
        db.run(`DELETE FROM '${table}' WHERE time='${time}' AND assignment='${assignment}'`);
    },
    sq_get_table: async function sq_get_table(callback){
        // tablist = []
        db.serialize(() => {
            db.each(`SELECT * FROM sqlite_master WHERE type='table'`,function(err,rows){
                if (err){
                    console.log(err);
                }else{
                    callback(rows.name)
                }
            });
        });
    }
}
// const sq = require('./update')
// sq.sq_get('user778268252366700574', console.log)
