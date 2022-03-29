const {ErisBot} = require('../../structure/ErisIndex.js');
const eris = require('eris');

module.exports = {
    name: "unhandledRejection", 

    run: async(bot, reason, p) => {
        console.log(p);
        return console.log(`Erreur - ${reason}`)
    }
}