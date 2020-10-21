const Discord = require("discord.js")

module.exports = {
  name: 'ping',
  admin: false,
  description: 'This command will display the latency between Discord and our servers\n`!ping`\nexample: `!ping`',
  async execute(msg) {
    msg.channel.send('Pinging...').then(message => {
      const embed = new Discord.RichEmbed()
      embed.setTitle("Ping")
      embed.setColor('#36393F');
      embed.setDescription(
        `:ping_pong: Pong! ${message.createdTimestamp - msg.createdTimestamp}ms`
      );
      embed.setColor("#36393F")
      embed.setTimestamp();
      embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
      embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
      message.edit(embed)
    })
  }
}
