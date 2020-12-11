const moment = require("moment");
const sq = require("../update");

function add_to_role(list, member){
    for (role in member){
        sq.sq_add(member, list)
    }
}

function rm_parse(args){
    rm_cmd = args.join(" ")
    rm_time = rm_cmd.substr(0,rm_cmd.indexOf("<")).trim();
    rm_message = rm_cmd.substr(rm_cmd.lastIndexOf(">")+1).trim();
    rm_time = moment(rm_time).format("YYYY-MM-DD HH:mm");
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
    }
    return memberlist;
}
module.exports = {
    name: 'add',
    description: "add assignments",
    execute(message, args){
        add_to_role(rm_parse(args), rm_member(message))
    }   
}
