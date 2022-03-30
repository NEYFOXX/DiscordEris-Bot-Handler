const {ErisBot} = require('../../structure/ErisIndex'); 
const eris = require('eris');
const { Message } = require('eris');

module.exports = {
    name: "prefix",
    description: "Permet de changer le prefix du bot", 
    usage: "+prefix <prefix>", 
    /**
     * 
     * @param {ErisBot} bot 
     * @param {Message} message 
     * @param {Array<>} args 
     * @param {string} cmdName 
     */
    run: async(bot, message, args, cmdName) => {
        if(!message.member.permissions.has("administrator")) return bot.createMessage(message.channel.id, "Vous n'avez pas les permissions suffisantes pour pouvoir changer mon prefix"); 

        let newprefix = args[0];
        if(!newprefix) return bot.createMessage(message.channel.id, "Donnez moi un nouveau prefix");
        bot.db.query(`SELECT * FROM settings WHERE serverid = ${message.guildID}`, async(err, data) => {
            if(data[0].prefix === newprefix) return bot.createMessage(message.channel.id, "Vous m'avez donné le même prefix que celui que je possède actuellement");
        }); 
        bot.db.query(`UPDATE settings SET prefix = "${newprefix}" WHERE serverid = ${message.guildID}`);
        await bot.createMessage(message.channel.id, `Mon nouveau prefix est \`${newprefix}\``); 
    }
}