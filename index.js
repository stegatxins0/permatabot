const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", function (){
    console.log(`${bot.user.username} Is Online!`);
});

client.login(process.env.token);