const Discord = require("discord.js")

module.exports = {
  name: 'snowflake',
  description: 'This command will translate a snowflake into a timestamp',
  async execute(msg) {
    if(msg.content.split(' ').length != 2) return;
    let snowflake = parseFloat(msg.content.split(" ")[1])
    let timestamp = Math.floor(snowflake / 4194304 + 1420070400000);
    const embed = new Discord.RichEmbed();
    embed.setTitle("Snowflake to Timestamp")
    embed.setDescription(`The Discord Snowflake **${snowflake}** is **${timestamp}** timestamp`)
    embed.setColor("#36393F")
    embed.setTimestamp();
    embed.addField("Invite Opal", "https://bit.ly/invite-opal", true)
    embed.addField("Join the Server", "https://discord.gg/ktShq9q", true)
    embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
    msg.channel.send(embed)
  }
}
