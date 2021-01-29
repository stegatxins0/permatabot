const sqlite3 = require('sqlite3')
db = new sqlite3.Database('./assignment.db')
module.exports = {
    name: 'rm',
    description: "remove assignment with .rm *user* *assignment*",
    execute(message, args){
        user = args[0]
        assignment = args.slice(1).join(" ");
        function sq_delete(table, assignment){
            db.run(`DELETE FROM '${table}' WHERE assignment='${assignment}'`, function(err){
            if (err){
                console.log(err)
                message.channel.send("Are you sure you enter the right assignment and username?")
            } else {
                message.channel.send(`${assignment} deleted from user ${table} successfully.`)
            }
            });
        }
        console.log(user)
        console.log(assignment)
        if(user && assignment){sq_delete(user, assignment)}else{message.channel.send("Remove assignment with .rm *user* *assignment*")}
    }
}
