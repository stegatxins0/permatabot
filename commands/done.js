module.exports = {
    name: 'done',
    description: "this is a done command!",
    execute(db, moment, message, args, Discord){
        cur = 0
        mesg = ""
        function sq_get_total(table){
            db.serialize(() => {
                db.each(`SELECT COUNT(*) from ${table}`,function(err,rows){
                    if (err){
                        message.channel.send("No assignment found")
                    }else{
                        ttl = rows["COUNT(*)"];
                    }
                });
            });
        }
        function sq_get(table, callback){
            db.run(`VACUUM`)
            sq_get_total(table)
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
        function callparse(list, table){
                mesg = mesg.concat(`\n *${list.time}* ➤ ${list.assignment}`)
                cur = cur + 1
                if (cur == ttl){
                    let newEmbed = new Discord.MessageEmbed()
                        .setColor('00FF00')
                        .setTitle(`Past Assignment List`)
                        .setDescription(mesg)
                    message.reply(newEmbed);
                }
        }
        sq_get(`completed_user_${message.author.id}`, callparse)
    }
}
