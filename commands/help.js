module.exports = {
    name: 'help',
    description: "this is a help command!",
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#FFD700')
        .setTitle("Help Me!")
        .setDescription("First time using this bot? Don't worry!.")
        .addFields(
            {name: 'Add', value: "just run `.add` and follow the guides. easy"},
            {name: 'List', value: "Run `.list` to see assignment that are not completed. For what you can do with the reactions in `.list` see *List Reactions* for more details."},
            {name: 'List Reactions', value: "**Select Action Emoji and ID Emoji**\n✅: toggle between completed and not completed\n📝: toggle between ongoing and not ongoing\n🚮: delete (will not be saved into past logs)\nℹ️: view assignment details"},
            {name: 'Reminders', value: "Decided not to implement this because I'm sure many won't manually mark assignment as done. The ping might annoy them. All assignment that are already due will be automatically marked as done (`.upd` will be run every 1 hour). Might create this as an optional feature when I'm free."},
            {name: 'Can I use this command in Telegram', value: "**No** The owner of the telegram bridge bot disable the feature to bridge discord bot message. He/She also disable the puppetting feature(the feature to use nickname in discord)"},
            {name: 'Hosting', value: "The bot will be hosted locally for two weeks to make sure that there is no problem and the bot is stable. In other words it means that the bot will be up only as long as my laptop is on."},
            {name: 'Any quesitons', value: "Ping or pm me `stegatxins0#7346`"}
        )
        message.reply(newEmbed);
    }
}
