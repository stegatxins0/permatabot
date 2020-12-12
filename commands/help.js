module.exports = {
    name: 'help',
    description: "this is a help command!",
    execute(message, Discord){
        const helpmsg = new Discord.MessageEmbed()
            .setColor('#008080')
            .setTitle("PERMATA BOT")
            .setDescription("This is a proof of concept. There will be lots of bugs. I program this since I was too bored of add math class. I will rewrite this bot with a better programming language in the future.")
            .addFields(
                { name: "How can I add an assignment?", value: `Run .add for more information. You can add assignment for your friends too.`},
                { name: "Where can I view my assignment?", value: "Go to assignmentchannel which can be set in the settings. To update the list immediately send any message to assignment channel. The list will be updated every 30 minutes. I **HIGHLY recommend** you to mute assignmentchannel."},
                { name: "Completed your assignment?", value: "React to the assignment that you have completed and the assignmet will be removed from your list."},
                { name: "Forget to complete your assignment? Don't worry!", value: "The bot will ping you for reminder 1 day before the deadline, 3 hours before the deadline, and when the deadline is over (the assignment will be removed)."},
                { name: "How can I change settings?", value: "Run .set for more options. Currently, the bot only support configuration for assignmentchannel and reminderchannel."},
                { name: "How long will the bot be online?", value: "The bot will be up for 24/7 if the bot don't crash. The bot is hosted at heroku.com."},
                { name: "Future of the bot?", value: "Hopefully all minor bugs will be fixed and the bot will have better error handling and better performance after the rewrite. After that, I envision the bot to be able to manage group work such as auto generate google slide link and assign task to members. I'll also create a feature to record my Japanese learning journey."},
                { name: "Any bugs or recommendation?", value: "Message me or submit an issue at https://github.com/stegatxins0/permatabot"}
                )

        message.channel.send(helpmsg);
    }
}
