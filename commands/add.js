module.exports = {
    name: 'add',
    description: "add assignments",
    execute(message, args){
        var rm_time = [];
        var i;
        for (i in args){
            if (i.startsWith('@')) {
                var rm_role = i;
                delete args[0];
                rm_msg = args.join(" ");
                break;
            } else {
                rm_time.pop(i);       
            }
        message.channel.send(rm_time + "\n" + rm_role + "\n" + rm_message);
        } 
        // const rm_role = message.mentions.users.first()
        // let rm_time = args[0]
        // let rm_role = args[1]
        // let rm_message = args.slice(2).join("")
    }
}