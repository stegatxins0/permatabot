module.exports = {
    name: 'add',
    description: "add assignments",
    execute(message, args){
        let rm_time = args[0]
        let rm_role = args[1]
        let rm_message = args.slice(2).join("")
        message.channel.send(rm_time + "\n" + rm_role + "\n" + rm_message);
    }
}