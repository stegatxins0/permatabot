const moment = require("moment");
const { sort_date, sq_get } = require("../update");
const sq = require("../update");
module.exports = {
    name: 'list',
    description: "this is a list commmand",
    execute(message, args){
        function parsetomsg(list){
            var friendlydate = moment(list.time, 'YYYY-MM-DD hh:mm').fromNow();
            message.channel.send(`**${friendlydate}** 🏹 ${list.assignment}`) 
            console.log(moment().format('YYYY-MM-DD HH:mm'))
        }

        function callparse(username) {
            sort_date
            message.channel.send(`<@${username.substr(4)}>`)
            sq.sq_get(username, parsetomsg)
        }

        sq.sq_get_table(callparse)
    }
}
