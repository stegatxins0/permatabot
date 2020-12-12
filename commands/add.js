const moment = require("moment");
const sq = require("../update");
const delay = ms => new Promise(res => setTimeout(res, ms));

module.exports = {
    name: 'add',
    format: '*add time @user/role assignment*',
    description: "Please follow the format. DO NOT USE COMMAND THAT DOESN'T FOLLOW THIS FORMAT OR THE BOT WILL CRASH",
    async execute(message, args, Discord){
        const helpmsg = new Discord.MessageEmbed()
            .setColor('#7FE5F0')
            .setTitle("ADD ASSIGNMENT")
            .setDescription(this.description)
            .addField("Format", this.format)
            .addFields(
                { name: "Time", value: `Time currently only support the format **12 Dec 2020 23:59**. If time is not mentioned it will default to 1200. If year is not mentioned it will default to 1970?.`},
                { name: "Ping", value: `*@2k1 or @aqil*. You can only ping one user or role. The assignment will be added to all of the members of pinged role. Do not ping @everyone or @here`},
                { name: "Assignment", value: `Insert any text you want. Do not use weird symbol such as <, # or @`}
                )
        function add_to_role(list, member){
            if(list){
            for (role in member){
                sq.sq_add(member[role], list)
            }
            }
        }
        function rm_parse(args){
            rm_cmd = args.join(" ")
            rm_time = rm_cmd.substr(0,rm_cmd.indexOf("<")).trim();
            rm_message = rm_cmd.substr(rm_cmd.lastIndexOf(">")+1).trim();
            rm_time = moment(rm_time).format("YYYY-MM-DD HH:mm");
            validcheck = moment(rm_time, "YYYY-MM-DD HH:mm").isValid()
            if (validcheck != true){
                message.reply("Time is invalid. Please use 2020 Dec 12 23:59");
                return;
            }
            rm_list = [];
            rm_list.push(rm_time, rm_message);
            return rm_list;
        }
        
        function rm_member(message){
            let memberlist = []
            let role = message.mentions.roles.first();
            if (message.mentions.members.first()) {
                memberlist.push(message.mentions.members.first().id)
            } else if (message.mentions.roles.first()) {
                let roleID = message.mentions.roles.first().id;
                role.members.forEach(user => {
                memberlist.push(user.user.id);
                });
            } else {
                message.reply(helpmsg);
                return;
            }
            return memberlist;
        }
        if(!args[0] || !args[1] || !args[2]){message.reply(helpmsg)}
        else{
            add_to_role(rm_parse(args), rm_member(message))
            await delay(3000)
            message.reply("Done. 🙂")
        }  
    } 
    }
