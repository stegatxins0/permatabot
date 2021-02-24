// const sqlite3 = require('sqlite3')
module.exports = {
    name: 'list',
    description: "list assignment with .list *user*",
    async execute(db, moment, message, args, Discord, client){
        cur = 0
        mesg = ""
        function sq_get_total(table){
            db.serialize(() => {
                db.each(`SELECT COUNT(*) from ${table}`,function(err,rows){
                    if (err){
                        message.channel.send("Are you a first time user?")
                    }else{
                        ttl = rows["COUNT(*)"];
                        if (ttl == 0){message.reply("**Congratulations**, you have completed all assignment ||or you are too lazy to add assignment||")}
                    }
                });
            });
        }
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
        }
        // alphabetlist=[0,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        alphabetlist=[0,"🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇱","🇲","🇳","🇴","🇵","🇶","🇷","🇸","🇹","🇺","🇻","🇼","🇽","🇾","🇿"]
        statuslist=["⬜","✅","🟧"]
        wordstatuslist=["Not done", "Done", "Doing"]

        async function callparse(list, table){
            // friendlydate = list.time.fromNow();
                mesg = mesg.concat(`\n${alphabetlist[list.rowid]} ${statuslist[list.status]} **${moment(list.time, 'YYYY-MM-DD hh:mm').fromNow()}** | *${list.time}* ➤ ${list.assignment}`)
                cur = cur + 1
                if (cur == ttl){
                    let newEmbed = new Discord.MessageEmbed()
                        .setColor('#304281')
                        .setTitle(`Assignment List`)
                        .setDescription(mesg)
                    let messageEmbed = await message.reply(newEmbed);
                    messageEmbed.react("✅")
                    messageEmbed.react("📝")
                    messageEmbed.react("🚮")
                    messageEmbed.react("ℹ️")
                    curn = 0
                    while (curn < ttl){
                        curn = curn + 1
                        messageEmbed.react(`${alphabetlist[curn]}`)
                    }
                    messageEmbed.awaitReactions((reaction, user) => user.id == message.author.id, { min:2, max: 2, time: 30000 }).then(collected => {
                        if (collected.array()[1]){raa = [collected.array()[0].emoji.name,collected.array()[1].emoji.name]}
                        if (raa.includes("✅")){
                            for (xx in raa){
                                yy = alphabetlist.indexOf(raa[xx])
                                if (yy != -1){
                                    // sq_add(`completed_${table}`, [list.time, list.assignment, ] )
                                    function haio(rows, table){
                                        if(rows.status == 1){newstatus = 0}else{newstatus = 1}
                                        db.run(`UPDATE '${table}' SET status=${newstatus} WHERE rowid='${yy}'`, function(err){
                                        if (err){
                                            console.log(err)
                                            message.channel.send(`ERROR CHANGING ASSIGNMENT STATUS`)
                                        } else {
                                            message.channel.send(`Status of assignment ${alphabetlist[yy]} had been changed to **${wordstatuslist[newstatus].toLowerCase()}**`)
                                        }
                                        })
                                    }
                                    sq_get(table, haio, yy)
                                    // sq_get(table, msd, yy)
                                }
                            }
                        }
                        if (raa.includes("📝")){
                            for (xx in raa){
                                yy = alphabetlist.indexOf(raa[xx])
                                if (yy != -1){
                                    // message.channel.send(`You are doing assignment ${yy}.`)
                                    function hai(rows, table){
                                        if(rows.status == 2){newstatus = 0}else{newstatus = 2}
                                        db.run(`UPDATE '${table}' SET status=${newstatus} WHERE rowid='${yy}'`, function(err){
                                        if (err){
                                            console.log(err)
                                            message.channel.send(`ERROR CHANGING ASSIGNMENT STATUS`)
                                        } else {
                                            message.channel.send(`Status of assignment ${alphabetlist[yy]} had been changed to **${wordstatuslist[newstatus].toLowerCase()}**`)
                                        }
                                        })
                                    }
                                    sq_get(table, hai, yy)
                                }
                            }
                        }
                        if (raa.includes("🚮")){
                            for (xx in raa){
                                yy = alphabetlist.indexOf(raa[xx])
                                if (yy != -1){
                                    db.run(`DELETE FROM '${table}' WHERE rowid='${yy}'`, function(err){
                                    if (err){
                                        console.log(err)
                                        message.channel.send(`ERROR DELETING ASSIGNMENT`)
                                    } else {
                                        // db.run(`VACUUM`)
                                        message.channel.send(`Assignment ${alphabetlist[yy]} was successfully **deleted** from user <@${table.slice(5)}>`)
                                    }
                                    });
                                }
                            }
                        }
                        if (raa.includes("ℹ️")){
                            for (xx in raa){
                                yy = alphabetlist.indexOf(raa[xx])
                                if (yy != -1){
                                    function hai(rows, table){
                                        let infoEmbed = new Discord.MessageEmbed()
                                            .setColor('#990000')
                                            .setTitle(rows.assignment)
                                            .addFields(
                                                {name: 'Due Date', value: rows.time},
                                                {name: 'Status', value: wordstatuslist[rows.status]},
                                                {name: 'Description', value: rows.details}
                                            )
                                        message.channel.send(infoEmbed);
                                        }
                                sq_get(table, hai, yy)
                                    }
                            }
                        }
                    }).catch(() => {return});

                }
            }
        // if (user){sq_get(user, callparse)}else{message.channel.send("Please insert username as argument, eg: .list thisismyname")}
        // client.commands.get('upd').execute(message, args).then(sq_get(`user_${message.author.id}`, callparse))
        db.run("VACUUM")
        sq_get(`user_${message.author.id}`, callparse)
    }
}
