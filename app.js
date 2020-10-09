// DEPENDENCIES
const Discord = require("discord.js");
const bot = new Discord.Client();
const request = require('request');
require('dotenv').config()
//

console.log("hi")
 
const util = require("util")
const sms = new (require('./features/sms'))();
const ebay = new (require('./features/ebay'))();
const email = new (require('./features/email'))();
const address = new (require('./features/address'))();
const control = new (require('./features/control'))();
const fee = new (require('./features/fee'))();
const help = new (require('./features/help'))();
const setup = new (require('./features/setup'))
const curr = new (require('./features/curr'))
const downloads = new (require('./features/downloads'))
const ping = new (require('./features/ping'))
const shoe = new (require('./features/shoe'))
const poll = new (require('./features/poll'))
const error = new (require('./features/error'))
const botbroker = new (require('./features/botbroker'))
const embed = new (require('./features/embed'))
const reminder = new (require('./features/reminder'))
const parcel = new (require('./features/parcel'))
const giveaway = new (require('./features/giveaway'))
const delay = new (require('./features/delay'))
const snowflake = new (require('./features/snowflake'))
const geocoder = new (require('./features/geocoder'))
const supcommunity = new (require('./features/supcommunity'))
 
bot.on('message', (msg) => {
   var today = new Date();
   var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   var dateTime = `[${date} ${time}]`;
   var config = {
       prefix: "!"
   }
   if (msg.content.startsWith(`${config.prefix}help`)) {
       help.help_message(msg);
   }
   else if (msg.content.startsWith(`${config.prefix}fee`)) {
       fee.calculate_fee(msg, group, logo_url);
   }
   else if (msg.content.startsWith(`${config.prefix}email`)) {
       email.generate(msg, group, logo_url);
   }
   else if (msg.content.startsWith(`${config.prefix}address`)) {
       address.generate(msg, group, logo_url);
   }
   else if (msg.content.startsWith(`${config.prefix}ebay`)) {
       ebay.generate(msg, group, logo_url, guild_id);
   }
   else if (msg.content.startsWith(`${config.prefix}meeting`)) {
       control.meeting(msg.channel.guild, msg, guild_name, logo_url)
   }
   else if (msg.content.startsWith(`${config.prefix}downloads`)) {
       downloads.list(msg, guild_name, logo_url)
   }
   else if (msg.content.startsWith(`${config.prefix}delay`)) {
       delay.send(msg)
   }
   else if (msg.content.startsWith(`${config.prefix}snowflake`)) {
       snowflake.convert(msg)
   }
   else if (msg.content.startsWith(`${config.prefix}convert`)) {
       curr.convert(msg)
   }
   else if (msg.content.startsWith(`${config.prefix}spoof`)) {
       geocoder.convert(msg)
   }
   else if (msg.content.startsWith(`${config.prefix}ping`)) {
       ping.send(msg, guild_name, logo_url)
   }
   else if (msg.content.startsWith(`${config.prefix}botbroker`)) {
       botbroker.scrape(msg)
   }
   else if (msg.content.startsWith(`${config.prefix}new`)) {
       control.ticket(guild, msg, config, msg.author, false)
   }
   else if (msg.content.startsWith(`${config.prefix}shoe`)) {
       shoe.convert(msg)
   }
   else if (msg.content.startsWith(`${config.prefix}sellout`)) {
       supcommunity.sellout(msg)
   }
   else if (msg.content.startsWith(`${config.prefix}droplist`)) {
       supcommunity.droplist(msg)
   }
   if (msg.member.hasPermission("ADMINISTRATOR")) {
       if (msg.content.startsWith(`${config.prefix}poll`)) {
           poll.send(msg)
       }
       else if (msg.content.startsWith(`${config.prefix}close`)) {
           msg.channel.delete();
       }
       else if (msg.content.startsWith(`${config.prefix}add `)) {
           control.add(msg, msg.content.split(" ")[1], guild_name, logo_url)
       }
       else if (msg.content.startsWith(`${config.prefix}remove`)) {
           control.remove(msg, msg.content.split(" ")[1], guild_name, logo_url)
       }
       else if (msg.content.startsWith(`${config.prefix}archive`)) {
           control.archive(msg.channel.guild, msg, guild_name, logo_url)
       }
       else if (msg.content.startsWith(`${config.prefix}giveaway`)) {
           giveaway.send(msg)
       }
       else if (msg.content.startsWith(`${config.prefix}ticketreact`)) {
           control.ticketreact(bot, msg, guild, config)
       }
       else if (msg.content.startsWith(`${config.prefix}embed`)) {
           embed.send(msg)
       }
       else if (msg.content.startsWith(`${config.prefix}reminder`)) {
           reminder.send(msg)
       }
       else if (msg.content.startsWith(`${config.prefix}rename`)) {
           if (msg.content.split(' ').length != 2) {
               const embed = new Discord.RichEmbed()
               embed.setTitle("Error")
               embed.setDescription("Your command is missing one or more arguments")
               embed.setColor("#36393F")
               msg.channel.send(embed)
           }
           else {
               msg.channel.setName(msg.content.split(' ')[1])
               const embed = new Discord.RichEmbed()
               embed.setTitle("Channel Name Changed")
               embed.setDescription(`The channel has been renamed to ${msg.channel}`)
               embed.setColor("#36393F")
               msg.channel.send(embed)
           }
       }
   }
});
 
bot.on('ready', () => {
   bot.user.setActivity("!help | 32 servers")
});
 
// LOG IN
bot.login("NzUyMjkzOTI4MTU3NDQ2MTg0.X1ViUQ.lqbdJzQ0NoUfc0_pWk_yzQnTCmU").then(() => {
   console.log('authorized in all servers');
});
