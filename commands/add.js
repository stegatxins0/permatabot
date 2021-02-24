module.exports = {
    name: 'add',
    description: "this is an add command!",
    async execute(db, moment, message, args, Discord, client){
        function guser(collected){
            newnamearr = []    
            namearr = collected.first().content.toLowerCase().split(/(\s+)/);
            for (x in namearr){
                if (namearr[x] == "3k1"){newnamearr.push("778268252366700574", "570522377465626625", "350228520355495936")
                }else if (namearr[x] == "moral"){newnamearr.push("778268252366700574", "570522377465626625")
                }else if (namearr[x].startsWith('<@') && namearr[x].endsWith('>')){
                    mention = namearr[x].slice(2, -1);
                    if (mention.startsWith('!')) {mention = mention.slice(1);}
                    if (!mention.startsWith('&')){newnamearr.push(mention)}
                }
            }
            if(newnamearr.length > 0){
                return newnamearr
            }else{
                return false
            }
        }

        function sq_add(username, masterlist){
            db.run(`CREATE TABLE IF NOT EXISTS user_${username} (time DATETIME, assignment TEXT, details TEXT, status INTEGER, checkremind INTEGER)`,function(err){
                if (err){
                    console.log(err);
                    message.reply("`ERROR: SQLITE ERROR` Please contact developer")
                }else{
                    db.run(`INSERT INTO user_${username} (time, assignment, details, status) VALUES (?, ?, ?, ?)`, masterlist);
                }
            })
        }

        async function awaitmsg(callback){
            await message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 30000}).then(collected => {res = callback(collected, arguments[1], arguments[2], arguments[3], arguments[4])}).catch(() => {message.reply('No answer after 30 seconds, operation canceled.'); res = false});
            return res;
        }

        function gtime(collected){
            var newdate = moment(collected.first().content);
            if (moment(newdate).format('HH:mm') == "00:00") {newdate = moment(newdate).set({"hour": 23, "minute": 59});}
            if (moment(newdate).format('YYYY') == "2001") {newdate = moment(newdate).set({"year": moment().format('YYYY')});}
            if(newdate.isValid()){
                return newdate.format('YYYY-MM-DD HH:mm')
            }else{return false}
        }

        function joinusrname(listusr){
            finalname = ""
            for(x in listusr){
                usrn = (`<@${listusr[x]}> `)
                finalname = finalname.concat(usrn)
            }
            return finalname;
        }

        function gtitle(collected){
            return collected.first().content
        }

        function gdes(collected){
            if (collected.first().content.toLowerCase() == "none"){
                return "None"
            }else{
                return collected.first().content
            }
        }

        function confirmyes(finalname, finaldate, finaltitle, finaldescription){
            let newEmbed = new Discord.MessageEmbed()
               .setColor('#FFFF00')
               .setTitle("Is this correct?")
               .setDescription("Reply `Yes` to confirm. Reply otherwise to cancel.")
               .addFields(
                   {name: 'User', value: finalname},
                   {name: 'Due Date', value: finaldate},
                   {name: 'Title', value: finaltitle},
                   {name: 'Description', value: finaldescription}
             )
            message.reply(newEmbed)
        }

        async function gadd(collected, finalusr, finaltime, finaltitle, finaldes){
            if (collected.first().content.toLowerCase() == 'yes'){
                for (x in finalusr){
                    // inlist = [finaltime, finaltitle, finaldes, 2]
                    await sq_add (finalusr[x], [finaltime, finaltitle, finaldes, 0]);
                    // console.log(finalusr[x], [finaltime, finaltitle, finaldes, 2])
                }
                return true
            }else{return false}
        }
        message.reply('Please insert ping or alias. `3k1: jack, cw, aqil` `moral: jack, cw`');
        finalusr = await awaitmsg(guser)
        if (finalusr != false){
            message.reply("Please insert due date for this assignment")
            finaltime = await awaitmsg(gtime)
            if (finaltime != false){
                message.reply("Please insert your assignment title.")
                finaltitle = await awaitmsg(gtitle)
                if (finaltitle != false){
                    message.reply("**OPTIONAL**: Please insert assignment details. To skip this step answer `none`")
                    finaldes = await awaitmsg(gdes)
                    if (finaldes != false ){
                        confirmyes(joinusrname(finalusr), finaltime, finaltitle, finaldes)
                        finalres = await awaitmsg(gadd, finalusr, finaltime, finaltitle, finaldes)
                        if ( finalres != false){
                            message.reply("Assignment added sucessfully.")
                        }else{message.reply("Operation cancelled by user request.")}
                    }
                }
            }else{message.reply('Please insert a valid date'); return}
        }else{message.reply('Please insert a valid ping or alias.'); return}
   }
}

