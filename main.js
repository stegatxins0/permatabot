const Discord = require('discord.js');
const client = new Discord.Client();
 
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
    client.user.setActivity("Stop procrastinating!");
    if(!message.content.startsWith(prefix)) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } 
    else if(command === 'add'){
        client.commands.get('add').execute(message, args);
    } 
    else if(command === 'list'){
        client.commands.get('list').execute(message, args);
    } 
    else if(command === 'help'){
        client.commands.get('help').execute(message, args);
    } 
    else if(command === 'rm'){
        client.commands.get('rm').execute(message, args);
    } 
});
 
client.login(process.env.token);
