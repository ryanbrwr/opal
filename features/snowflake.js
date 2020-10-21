const Discord = require("discord.js")

module.exports = {
  name: 'snowflake',
  admin: false,
  description: 'This command will convert the given discord snowflake to a UTC timestamp\n`!snowflake <id>`\nexample: `!snowflake 710705901941555250`',
  async execute(msg) {
    if(msg.content.split(' ').length != 2) return;
    let snowflake = parseFloat(msg.content.split(" ")[1])
    let timestamp = Math.floor(snowflake / 4194304 + 1420070400000);
    const embed = new Discord.RichEmbed();
    embed.setTitle("Snowflake to Timestamp")
    embed.setDescription(`The Discord Snowflake **${snowflake}** is **${timestamp}** timestamp`)
    embed.setColor("#36393F")
    embed.setTimestamp();
    embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
    
    embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
    msg.channel.send(embed)
  }
}
