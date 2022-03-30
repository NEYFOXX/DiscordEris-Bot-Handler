const eris = require('eris');
const mysql = require('mysql2');
const config = require('../config.js');
const fs = require('fs');
const { Collection } = require('eris');

class ErisBot extends eris.Client {
    constructor(options = {
        intents: ["guildMessages"]
    }){
        super(options)
        this.commands = new Collection()
        this.aliases = new Collection()
        this.setMaxListeners(15)
        this.loadCommands()
        this.loadEvents()
        this.connect()
        this.config = config
        this.db = mysql.createConnection({
            user: config.database.user,
            password: config.database.password, 
            database: config.database.database
        });
    }

    loadCommands() {
        let Folder = fs.readdirSync(`./commands`)
        for(const category of Folder){
            const categ = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith(".js"))
            for(const commandFile of categ){
                const command = require(`../commands/${category}/${commandFile}`)
                this.commands.set(command.name, command)
                if (command.aliases && command.aliases.length > 0){
                    command.aliases.forEach(async(alias) => this.aliases.set(alias, command))
                }
            }
        }
    }

    loadEvents() {
        let Folder = fs.readdirSync(`./events`)
        for(const category of Folder){
            let categ = fs.readdirSync(`./events/${category}`).filter(file => file.endsWith('.js'))
            for(const commandFile of categ){
                const event = require(`../events/${category}/${commandFile}`);
                this.on(event.name, (...args) => event.run(this, ...args))
                if(category === "anticrash") process.on(event.name, (...args) => event.run(this, ...args))
            }
        }
    }
}

exports.ErisBot = ErisBot