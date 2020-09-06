// DEPENDENCIES
const Discord = require("discord.js");
var twilio = require('twilio');
const chalk = require('chalk')
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ryan:hunter13@cluster0-eztvk.mongodb.net/test?retryWrites=false&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const util = require("util")
const sms = new(require('./lib/sms'))();
const request = require('request');
const ebay = new(require('./lib/ebay'))();
const email = new(require('./lib/email'))();
const address = new(require('./lib/address'))();
const control = new(require('./lib/control'))();
const fee = new(require('./lib/fee'))();
const help = new(require('./lib/help'))();
const setup = new(require('./lib/setup'))
const curr = new(require('./lib/curr'))
const downloads = new(require('./lib/downloads'))
const ping = new(require('./lib/ping'))
const shoe = new(require('./lib/shoe'))
const poll = new(require('./lib/poll'))
const error = new(require('./lib/error'))
const botbroker = new(require('./lib/botbroker'))
const embed = new(require('./lib/embed'))
const reminder = new(require('./lib/reminder'))
const parcel = new(require('./lib/parcel'))
const giveaway = new(require('./lib/giveaway'))
const delay = new(require('./lib/delay'))
const snowflake = new(require('./lib/snowflake'))
const geocoder = new(require('./lib/geocoder'))
const supcommunity = new(require('./lib/supcommunity'))
const bot = new Discord.Client();

client.connect(err => {
    const collection = client.db("BrewBot").collection("configs");
    bot.on('message', (msg) => {
        if (msg.channel.type == 'dm') return;
        collection.findOne({
            "guild_id": msg.channel.guild.id
        }, function(err, config) {
            if (err) {
                console.log(err)
            } else {
                if(!msg.member) return;
                let guild_id = msg.channel.guild.id
                let guild_name = msg.channel.guild.name
                let group = msg.channel.guild.name
                let guild = bot.guilds.get(guild_id)
                let logo_url = "https://cdn.discordapp.com/attachments/668878386591957003/705900595881705602/BrewBott.png"
                //DATE INFO
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = `[${date} ${time}]`;
                if (msg.member.hasPermission("ADMINISTRATOR")) {
                    if (msg.content == `${config.prefix}config`) {
                        const embed = new Discord.RichEmbed();
                        embed.setTitle("Config Commands")
                        embed.setColor("#36393F");
                        embed.addField("Add member role", util.format("`%sconfig member`", config.prefix));
                        embed.addField("Add staff role", util.format("`%sconfig staff`", config.prefix));
                        embed.addField("Change prefix", util.format("`%sconfig prefix`", config.prefix));
                        embed.addField("Configure SMS", util.format("`%sconfig sms`", config.prefix));
                        embed.addField("Configure ticket category", util.format("`%sconfig ticket_category`", config.prefix));
                        msg.channel.send(embed);
                    }
                    if (msg.content.startsWith(`${config.prefix}config `)) {
                        if (msg.content.split(" ").length != 2) return
                        if (msg.content.split(" ")[1] == 'member') {
                            setup.update(msg, collection, "member_role", "Please input the name of your member role")
                        } else if (msg.content.split(" ")[1] == 'staff') {
                            setup.update(msg, collection, "staff_role", "Please input the name of your staff role")
                        } else if (msg.content.split(" ")[1] == 'prefix') {
                            setup.update(msg, collection, "prefix", "Please input the desired prefix")
                        } else if (msg.content.split(" ")[1] == 'ticket_category') {
                            setup.update(msg, collection, "ticket_category", "Please input the ID of your ticket category")
                        } else if (msg.content.split(" ")[1] == 'sms') {
                            let variables = ["twilio_sid", "twilio_token", "twilio_mass_sid"]
                            let descriptions = ["Please input the SID for your twilio account", "Please input the token for your twilio account", "Please input the SID for your new mass text service"]
                            setup.sms(msg, collection, variables, descriptions)
                        } else {
                            msg.reply(":beers: We don't know that command yet! Type `!config` for a list of config commands.")
                        }
                    }
                }
                if (msg.content.startsWith(`${config.prefix}help`)) {
                    help.help_message(msg);
                    console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` help used by ${msg.author.username}`)
                }
                if (msg.content.startsWith(`${config.prefix}fee`)) {
                    if (config.fee || config.full) {
                        fee.calculate_fee(msg, group, logo_url);
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` fee used by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}email`)) {
                    if (config.email || config.full) {
                        email.generate(msg, group, logo_url);
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` email j1g used by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}address`)) {
                    if (config.address || config.full) {
                        address.generate(msg, group, logo_url);
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` address j1g used by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}sms delete`)) {
                    if (config.sms || config.full) {
                        sms.delete(msg, group, logo_url, guild_id, config, collection)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}sms add`)) {
                    if (config.sms || config.full) {
                        sms.add(msg, group, logo_url, guild_id, config, collection)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}ebay`)) {
                    if (config.ebay || config.full) {
                        ebay.generate(msg, group, logo_url, guild_id);
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` ebay view bot used by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}meeting`)) {
                    if (config.meeting || config.full) {
                        control.meeting(msg.channel.guild, msg, guild_name, logo_url)
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` meeting used by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}downloads`)) {
                    if (config.downloads || config.full) {
                        downloads.list(msg, guild_name, logo_url)
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` downloads used by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}delay`)) {
                    if (config.downloads || config.full) {
                        delay.send(msg)
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` delay calculator used by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}snowflake`)) {
                    if (config.downloads || config.full) {
                        snowflake.convert(msg)
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` snowflake converter used by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}convert`)) {
                    if (config.convert || config.full) {
                        curr.convert(msg)
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` currency converter used by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}spoof`)) {
                    if (config.convert || config.full) {
                        geocoder.convert(msg)
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` spoofer used by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}ping`)) {
                    ping.send(msg, guild_name, logo_url)
                    console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` ping used by ${msg.author.username}`)
                }
                if (msg.content.startsWith(`${config.prefix}botbroker`)) {
                  if(config.botbroker || config.full){
                    botbroker.scrape(msg)
                    console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` botbroker used by ${msg.author.username}`)
                  } else {
                    error.paid(msg)
                  }
                }
                if (msg.content.startsWith(`${config.prefix}new`)) {
                    if (config.ticket || config.full) {
                        control.ticket(guild, msg, config, msg.author, false)
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` ticket created by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}shoe`)) {
                    if (config.shoe || config.full) {
                        shoe.convert(msg)
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` shoe converter used by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}sellout`)) {
                    if (config.control || config.full) {
                        supcommunity.sellout(msg)
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` supcommunity sellout times used by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (msg.content.startsWith(`${config.prefix}droplist`)) {
                    if (config.control || config.full) {
                        supcommunity.droplist(msg)
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` supcommunity droplist times used by ${msg.author.username}`)
                    } else {
                        error.paid(msg)
                    }
                }
                if (guild.member(msg.author.id).roles.find(role => role.name === config.staff_role) || msg.member.hasPermission("ADMINISTRATOR")) {
                    if (msg.content.startsWith(`${config.prefix}sms send`)) {
                        if (config.sms || config.full) {
                            sms.purge(msg, guild, group, logo_url, guild_id, config, collection)
                            sms.mass_text(msg, group, logo_url, guild_id, config, collection);
                        } else {
                            error.paid(msg)
                        }
                    }
                    if (msg.content.startsWith(`${config.prefix}poll`)) {
                        if (config.control || config.full) {
                            poll.send(msg)
                            console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` poll created by ${msg.author.username}`)
                        } else {
                            error.paid(msg)
                        }
                    }
                    if (msg.content.startsWith(`${config.prefix}close`)) {
                        if (config.control || config.full) {
                            msg.channel.delete();
                            console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` channel deleted by ${msg.author.username}`)
                        } else {
                            error.paid(msg)
                        }
                    }
                    if (msg.content.startsWith(`${config.prefix}add `)) {
                        if (config.control || config.full) {
                            control.add(msg, msg.content.split(" ")[1], guild_name, logo_url)
                            console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` user added by ${msg.author.username}`)
                        } else {
                            error.paid(msg)
                        }
                    }
                    if (msg.content.startsWith(`${config.prefix}remove`)) {
                        if (config.control || config.full) {
                            control.remove(msg, msg.content.split(" ")[1], guild_name, logo_url)
                            console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` user removed by ${msg.author.username}`)
                        } else {
                            error.paid(msg)
                        }
                    }
                    if (msg.content.startsWith(`${config.prefix}archive`)) {
                        if (config.control || config.full) {
                            control.archive(msg.channel.guild, msg, guild_name, logo_url)
                            console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` channel archived by ${msg.author.username}`)
                        } else {
                            error.paid(msg)
                        }
                    }
                    if (msg.content.startsWith(`${config.prefix}giveaway`)) {
                        if (config.control || config.full) {
                            giveaway.send(msg)
                            console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` giveaway created by ${msg.author.username}`)
                        } else {
                            error.paid(msg)
                        }
                    }
                    if(msg.content.startsWith(`${config.prefix}ticketreact`)) {
                      if(config.control || config.full) {
                        control.ticketreact(bot, msg, guild, config)
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` ticket react created by ${msg.author.username}`)
                      } else {
                        error.paid(msg)
                      }
                    }
                    if(msg.content.startsWith(`${config.prefix}embed`)) {
                      if(config.control || config.full) {
                        embed.send(msg)
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` embed used by ${msg.author.username}`)
                      } else {
                        error.paid(msg)
                      }
                    }
                    if(msg.content.startsWith(`${config.prefix}reminder`)) {
                      if(config.control || config.full) {
                        reminder.send(msg)
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` reminder used by ${msg.author.username}`)
                      } else {
                        error.paid(msg)
                      }
                    }
                    if(msg.content.startsWith(`${config.prefix}rename`)) {
                      if(config.control || config.full) {
                        if(msg.content.split(' ').length != 2)
                        {
                          const embed = new Discord.RichEmbed()
                          embed.setTitle("Error")
                          embed.setDescription("Your command is missing one or more arguments")
                          embed.setColor("#36393F")
                          msg.channel.send(embed)
                        }
                        else
                        {
                          msg.channel.setName(msg.content.split(' ')[1])
                          const embed = new Discord.RichEmbed()
                          embed.setTitle("Channel Name Changed")
                          embed.setDescription(`The channel has been renamed to ${msg.channel}`)
                          embed.setColor("#36393F")
                          msg.channel.send(embed)
                          console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` channel renamed by ${msg.author.username}`)
                        }
                      } else {
                        error.paid(msg)
                      }
                    }
                }
            }
        })
    })

    bot.on('guildCreate', (guild) => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = `[${date} ${time}]`;
        var query = {
            'guild_id': guild.id
        }
        var myobj = {
            $set: {
                "guild_id": guild.id,
                "guild_name": guild.name,
                "everyone": true,
                "full": false,
                "fee": false,
                "email": false,
                "address": false,
                "ebay": false,
                "control": false,
                "shoe": false,
                "ticket": false,
                "convert": false,
                "downloads": false,
                "meeting": false,
                "sms": false,
                "sms_list": [{
                    "user_id": "245033909748760577",
                    "number": "6316016787"
                }],
                "prefix": "!"
            }
        }
        var options = {
            "upsert": true
        }
        collection.updateOne(query, myobj, options, function(error, res) {
            if (error) {
                console.log(chalk.red(dateTime) + `[${guild.name}]: new guild not added to mongo server`)
            } else {
                console.log(chalk.green(dateTime) + `[${guild.name}]: new guild successfully added`)
            }
        });
    })
    bot.on('ready', () => {
        bot.user.setActivity("!help | 32 servers")
    })

    // LOG IN
    bot.login('').then(() => {
        console.log('======== ' + chalk.white('BrewBot☕ v. 1.1.1 | Developed by Ryan Brewer') + ' ========')
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = `[${date} ${time}]`;
        console.log(chalk.green(dateTime) + ` ${bot.user.tag} authorized in all servers`);
    });
})
