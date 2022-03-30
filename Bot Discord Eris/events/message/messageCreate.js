const {ErisBot} = require('../../structure/ErisIndex');
const eris = require('eris');

module.exports = {
    name: "messageCreate", 

    /**
     * 
     * @param {ErisBot} bot
     * @param {eris.Message} message 
     */
    run: async(bot, message) => {
        if(!message) return;
        if(!message.guildID) return;
        bot.db.query(`SELECT * FROM settings WHERE serverid = ${message.guildID}`, async(err, data) => {
        if(!message.content.startsWith(data[0].prefix)) return;
        let args = message.content.slice(data[0].prefix.length).trim().split(/ + /g)
        let cmdName = args[0].toLowerCase().normalize()
        let cmd = bot.commands.get(cmdName)
        if(!cmd) return;
        try {
            args.shift()
            cmd.run(bot, message, args, cmdName)
        }catch(err){console.log(err)}
    })
    }
}