const Discord = require("discord.js")
class Delay {
  send(msg) {
    if(msg.content.split(' ').length != 3) return;
    const { content } = msg;
    const tasks = parseFloat(content.split(' ')[1])
    const proxies = parseFloat(content.split(' ')[2])
    const embed = new Discord.RichEmbed()
    embed.setTitle("Delay Calculator");
    embed.setDescription(`With **${tasks}** tasks and **${proxies}** proxies, you should use a **${tasks/proxies*3500}ms** delay`)
    embed.setColor("#36393F")
    msg.channel.send(embed)
  }
}
module.exports = Delay
