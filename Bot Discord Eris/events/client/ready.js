const {ErisBot} = require('../../structure/ErisIndex');
const eris = require('eris');

module.exports = {
    name: "ready", 

    /**
     * 
     * @param {ErisBot} bot 
     */

    run: async(bot) => {
        console.log(
            `Je suis connecté : ${bot.user.username}#${bot.user.discriminator}\n` + 
            `Serveurs : ${bot.guilds.size}\n` + 
            `Membres : ${bot.users.size}`
        )
        
        bot.guilds.forEach(async(guild) => {
            bot.db.query(`SELECT * FROM settings WHERE serverid = ${guild.id}`, async(err, data) => {
                if(data.length < 1){
                    bot.db.query(`INSERT INTO settings (serverid, prefix) VALUES ("${guild.id}", "+")`)
                    bot.db.query(`SELECT * FROM settings WHERE serverid = ${guild.id}`, async(err, req) => {
                        console.log(req);
                    })
                }
            })
        })
    }
}