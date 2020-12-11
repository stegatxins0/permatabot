const sqlite3 = require('sqlite3')
db = new sqlite3.Database('./assignment.db')
module.exports = {
    sort_date :function sort_date(table){
        db.run(`SELECT * FROM ${table} ORDER BY datetime(time) DESC Limit 1`)
    },
    sq_add: function sq_add(id, list){
        db.run(`CREATE TABLE IF NOT EXISTS user${id} (time TEXT, assignment TEXT)`,function(err){
            if (err){
                console.log(err)
            } else{
                db.run(`INSERT INTO user${id} (time, assignment) VALUES (?, ?)`, list);
            }
        });
    },
    sq_get: function sq_get(table, callback){
        db.serialize(() => {
            db.each(`SELECT * FROM ${table}`,function(err,rows){
                if (err){
                    console.log(err);
                }else{
                    callback(rows);
                }
            });
        });
    },
    sq_get_table: function sq_get_table(callback){
        db.serialize(() => {
            db.each(`SELECT * FROM sqlite_master WHERE type='table'`,function(err,rows){
                if (err){
                    console.log(err);
                }else{
                    callback(rows.name);
                }
            });
        });
    }
}
// const sq = require('./update')
// sq.sq_get('user778268252366700574', console.log)
