const {ErisBot} = require('../../structure/ErisIndex');
const eris = require('eris');
const { Message } = require('eris');

module.exports = {
    name: "ping", 
    description: "Voir la latence de votre bot", 
    usage: "+ping", 
    /**
     * 
     * @param {ErisBot} bot 
     * @param {Message} message 
     * @param {Array<>} args 
     */
    run: async(bot, message, args) => {
        let a = message.createdAt
        await bot.createMessage(message.channel.id, "Calcul en cours...").then((msg) => {
            let ping = msg.createdAt - a
            msg.edit({content: `Ma latence est de ${ping} ms`}); 
        })
    }
}