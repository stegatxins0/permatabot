const Discord = require('discord.js');
const sqlite3 = require('sqlite3')
require('dotenv').config()
db = new sqlite3.Database('./assignment.db')
const client = new Discord.Client();
const moment = require('moment-timezone')
moment().tz("Asia/Kuala_Lumpur").format();
 
const prefix = '.';
 
const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('bot is online!');
});
client.on('message', message =>{
    client.user.setActivity(".help");
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    setInterval(() => {
        // client.commands.get('ping').execute(message);
        client.commands.get('upd').execute(db, moment, message, args, Discord, client);
    }, 3600000); 

    if(!message.content.startsWith(prefix)) return;
    if(command === 'ping'){
        client.commands.get('ping').execute(message);
    } 
    else if(command === 'add'){
        client.commands.get('add').execute(db, moment, message, args, Discord, client);
    } 
    else if(command === 'list'){
        client.commands.get('list').execute(db, moment, message, args, Discord, client);
    } 
    else if(command === 'upd'){
        client.commands.get('upd').execute(db, moment, message, args, Discord, client);
    } 
    else if(command === 'done'){
        client.commands.get('done').execute(db, moment, message, args, Discord);
    } 
    else if(command === 'help'){
        client.commands.get('help').execute(message, args, Discord);
    } 
});
 
// client.login(process.env.token);
client.login(process.env.DISCORD_TOKEN);
