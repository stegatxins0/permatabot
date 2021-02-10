module.exports = {
    name: 'help',
    description: "this is a help command!",
    execute(message, args){
        message.channel.send('Run .list / .add / .rm for more details.');
    }
}
