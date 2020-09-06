const Discord = require("discord.js")
class Error {
  paid(msg){
    const embed = new Discord.RichEmbed()
    embed.setTitle("Error")
    embed.setDescription("Your group currently does not have this feature.\nAsk the group owner to buy it!")
    embed.setColor("#36393F")
    msg.channel.send(embed)
  }
}
module.exports = Error;
