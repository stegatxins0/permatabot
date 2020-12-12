const moment = require("moment");
const sq = require("../update");
const delay = ms => new Promise(res => setTimeout(res, ms));
module.exports = {
    name: 'list',
    description: "this is a list commmand",
    execute(message, client, config){
        function callparse(username) {
            let mbrid = username.substr(4)
            message.channel.send(`<@${mbrid}>`)
            sq.sq_get(username, async function(list){
                var dtame = moment(list.time, 'YYYY-MM-DD hh:mm')
                if (dtame.diff(moment(), 'hours') < 24 && list.checkremind != 24 && list.check !=3){
                    sq.sq_update(username, list.time, list.assignment, 24)
                    client.channels.cache.get(config.reminders.remindchannel).send(`*<@${mbrid}>, *1 DAY LEFT WARNING**: Your assignment ${list.assignment} is due at ${list.time}`)
                }else if (dtame.diff(moment(), 'hours') < 3 && list.checkremind !=3){
                    sq.sq_update(username, list.time, list.assignment, 3)
                    client.channels.cache.get(config.reminders.remindchannel).send(`*<@${mbrid}>, **FINAL WARNING**: Your assignment ${list.assignment} is due at ${list.time}`)
                }else if (dtame.diff(moment()) < 0){
                    sq.sq_delete(username, list.time, list.assignment)
                    client.channels.cache.get(config.reminders.remindchannel).send(`*<@${mbrid}>, **REMOVING ${list.assignment}**: Prepare an excuse if you haven't done ${list.assignment} which was due at ${list.time}`)
                }
                var friendlydate = dtame.fromNow();
                let msg = await message.channel.send(`**${friendlydate}** | *${list.time}* ➤ ${list.assignment}`) 
                // msg.awaitReactions((reaction, user) => user.id == mbrid).then(collected => {
                    msg.awaitReactions((reaction, user) => user.id == mbrid, { max: 1 }).then(collected => {
                        // console.log(`${username} \n ${list.time} \n ${list.assignment}`)
                        sq.sq_delete(username, list.time, list.assignment)
                        message.channel.bulkDelete(99).then(veryuglycode())
                    })
            })
        }
        async function veryuglycode(){
            tablist = []
            function psh(name){
                tablist.push(name);
            }
            sq.sq_get_table(psh)
            await delay(5000);
            console.log(tablist)
            for (mbr in tablist){
                callparse(tablist[mbr])
                await delay(5000)
            }
    }
    message.channel.bulkDelete(99).then(veryuglycode())
}   
}
