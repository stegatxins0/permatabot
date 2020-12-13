const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const config = require('./config.json');
const prefix = '.';
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const moment = require("moment-timezone");
moment.tz.setDefault();

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message =>{
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    var minutes = 30, the_interval = minutes * 60 * 1000;
    setInterval(function() {
        console.log("Updating 30 minutes");
        client.commands.get('list').execute(message, client, config)
    }, the_interval);

    if(message.channel.id === config.reminders.assignmentchannel && !message.author.bot){
        client.commands.get('list').execute(message, client, config)
        // client.commands.get('list').execute(message)
    }else if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    if(command === 'ping'){
        client.commands.get('ping').execute(message);
    } else if(command === 'add'){
        client.commands.get('add').execute(message, args, Discord);
    } else if(command === 'set'){
        client.commands.get('set').execute(message, args, config, Discord)
    } else if(command === 'help'){
        client.commands.get('help').execute(message, Discord)
    } 
});

client.on("ready", function (){
    console.log(`${client.user.username} Is Online!`);
});
client.login("Nzg2NDcwNzQ5MzA5MTA4MjI0.X9G39g.wtw6aI6r27s41q7womerPlhVLqk");
// client.login(process.env.token);