const Discord = require("discord.js")
class Ping {
  send(msg) {
    const embed = new Discord.RichEmbed()
    embed.setTitle("Ping")
    embed.setColor('#36393F');
    embed.setDescription(":ping_pong: Pong!");
    msg.channel.send(embed)
  }
}

module.exports = Ping;
