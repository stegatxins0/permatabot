const fs = require('fs')
module.exports = {
    name: 'set',
    description: "Set channel for bot reminder and assignment",
    format: "set *remindchannel/assignmentchannel* **#channel**",
    execute(message, args, config, Discord){
        const setmsg = new Discord.MessageEmbed()
            .setColor('#ddaa55')
            .setTitle("SETTINGS")
            .setDescription(this.description)
            .addField("Format", this.format)
            .addFields(
                { name: "remindchannel", value: `Where the bot will send all reminders to. Currently set to <#${config.reminders.remindchannel}>`},
                { name: "assignmentchannel", value: `Where the bot will send the list of assignment to. Currently set to <#${config.reminders.assignmentchannel}>`}
                )
        if (args[0] == 'remindchannel') {
        config.reminders.remindchannel = message.mentions.channels.first().id
        fs.writeFileSync('./config.json', JSON.stringify(config));
        message.reply("Done")
        } else if (args[0] == 'assignmentchannel') {
        config.reminders.assignmentchannel = message.mentions.channels.first().id
        fs.writeFileSync('./config.json', JSON.stringify(config));
        message.reply("Done")
        } else {
        message.reply(setmsg)
        }
    }
}
