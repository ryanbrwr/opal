const Discord = require('discord.js')
const request = require('request');
const chalk = require('chalk')

class Ebay {
    async generate(msg) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = `[${date} ${time}]`;
        let guild_name = msg.channel.guild.name

        if (msg.content.split(" ").length == 2) {
            let embed = new Discord.RichEmbed();
            embed.setTitle("eBay View Bot")
            embed.setColor('#36393F');
            embed.setDescription('Sending `100` views...');
            msg.channel.send(embed);
            let url = msg.content.split(" ");
            url = url[1];
            const data = {
                "requestURL": url,
                "refreshRate": 5000
            }
            for (var i = 0; i < 50; i++) {
                setTimeout(function() {
                    request({
                            url: data.requestURL,
                            method: "GET",
                            timeout: data.refreshRate,
                            followRedirect: true,
                            maxRedirects: 10
                        },
                        function(error, response, body) {
                            if (error) {
                                console.log(chalk.red(dateTime + `[${guild_name}]:`) + ` error in ebay view`);
                            }
                        });
                }, i * data.refreshRate)
            }
        } else if (msg.content.split(" ").length > 2) {
            let embed = new Discord.RichEmbed();
            embed.setTitle("eBay View Bot")
            embed.setColor('#36393F');
            embed.setDescription('This command only takes one URL');
            msg.channel.send(embed);
        } else if (msg.content.split(" ").length == 1) {
            let embed = new Discord.RichEmbed();
            embed.setTitle("eBay View Bot")
            embed.setColor('#36393F');
            embed.setDescription('Please input a URL');
            msg.channel.send(embed);
        }
    }
}
module.exports = Ebay;
