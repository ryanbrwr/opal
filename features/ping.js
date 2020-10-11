const Discord = require("discord.js")

module.exports = {
  name: 'ping',
  description: 'This command will display the latency between Discord and our servers',
  async execute(msg) {
    const embed = new Discord.RichEmbed()
    embed.setTitle("Ping")
    embed.setColor('#36393F');
    embed.setDescription(":ping_pong: Pong!");
    msg.channel.send(embed)
  }
}
