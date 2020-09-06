const Discord = require('discord.js');
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10'
});
AWS.config.update({
    region: 'us-east-1'
});
const chalk = require('chalk')

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = `[${date} ${time}] `;

class SMS {
    async mass_text(msg, group, logo_url, guild_id, config, collection) {
        if (msg.author.bot) return;
        let guild_name = msg.channel.guild.name
        var twilio = require('twilio');
        var twilio = new twilio(config.twilio_sid, config.twilio_token);
        let numbers = []
        let content = msg.content.split(" ")
        content.shift()
        content.shift()
        content = content.join(" ")
        config.sms_list.forEach((i, j) => {
          numbers.push(i.number)
        })
        Promise.all(
          numbers.map(number => {
            return twilio.messages.create({
              to: number,
              from: config.twilio_mass_sid,
              body: content
            });
          })
        )
        .then(messages => {
        })
        .catch(err => console.error(err));
        const embed = new Discord.RichEmbed();
        embed.setTitle("SMS Messages")
        embed.setColor('#36393F');
        embed.setDescription('Message Sent!');
        msg.channel.send(embed)
        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` mass sms sent`);
      }

    async purge(msg, guild, group, logo_url, guild_id, config, collection) {
        let guild_name = msg.channel.guild.name
        var twilio = require('twilio');
        var twilio = new twilio(config.twilio_sid, config.twilio_token);
        let k = 0;
        config.sms_list.forEach((i, j) => {
          if (!guild.member(i.user_id)) return;
          if (guild.member(i.user_id).roles.find(role => role.name === config.member_role) || config.everyone) {

          }
          else {
            let query = {
                "guild_id": msg.channel.guild.id
            }
            let myobj = {
                $pull: {
                    sms_list: {
                        "user_id": i.user_id
                    }
                }
            }
            collection.updateOne(query, myobj, false, true, function(error, res) {
                if (error) {
                    console.log(error)
                } else {
                  k += 1;
                }
            });
          }
        })
        const embed = new Discord.RichEmbed();
        embed.setTitle("SMS Messages")
        embed.setColor('#36393F');
        embed.setDescription("Users Purged from SMS");
        msg.channel.send(embed)
        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` sms purge complete`);
    }
    async add(msg, group, logo_url, guild_id, config, collection) {
        msg.delete(500)
        let number = msg.content.split(" ")[2];
        if(number.length < 10) return;
        let query = {
            "guild_id": msg.channel.guild.id
        }
        let myobj = {
            $addToSet: {
                sms_list: {
                    "user_id": msg.author.id,
                    "number": number
                }
            }
        }
        collection.updateOne(query, myobj, function(error, res) {
            if (error) {
                console.log(chalk.red(dateTime) + `[${msg.guild.name}]: new number not added`)
                console.log(error)
            } else {
                console.log(chalk.green(dateTime) + `[${msg.guild.name}]: new number successfully added`)
                const mbed = new Discord.RichEmbed();
                mbed.setTitle("SMS Messages")
                mbed.setColor('#36393F');
                mbed.setDescription('SMS added! Type `!sms add <number>` to add yours!');
                msg.channel.send(mbed);
            }
        });
    }
    async delete(msg, group, logo_url, guild_id, config, collection) {
        msg.delete(500)
        let query = {
            "guild_id": msg.channel.guild.id
        }
        let myobj = {
            $pull: {
                sms_list: {
                    "user_id": msg.author.id,
                }
            }
        }
        collection.updateOne(query, myobj, false, true, function(error, res) {
            if (error) {
                console.log(chalk.red(`${dateTime}[${config.guild_name}]:`) + ` deletion unsuccessful`)
                console.log(error)
            } else {
                console.log(chalk.green(`${dateTime}[${config.guild_name}]:`) + ` number successfully deleted`)
            }
        });
        const mbed = new Discord.RichEmbed();
        mbed.setTitle("SMS Messages")
        mbed.setColor('#36393F');
        mbed.setDescription('SMS deleted! Type `!sms delete` to delete yours');
        msg.channel.send(mbed);
    }
}
module.exports = SMS;
