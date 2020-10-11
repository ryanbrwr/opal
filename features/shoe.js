const Discord = require("discord.js")

module.exports = {
  name: 'shoe',
  description: 'This command will translate shoe sizes from one size into another',
  async execute(msg) {
    if(msg.content.split(" ").length < 4) {
      msg.channel.send("You are missing one or more parameters. Please use `!help` to see an example of this command!")
    } else {
      let size = parseInt(msg.content.split(" ")[1])
      let from = msg.content.split(" ")[2].toUpperCase()
      let to = msg.content.split(" ")[3].toUpperCase()
      let fees = {
        "USUK": -1,
        "USEU": 33,
        "UKUS": 1,
        "UKEU": 34,
        "EUUS": -33,
        "EUUK": -34,
      }
      let acceptable = ['US', 'UK', 'EU']
      if(acceptable.includes(from) && acceptable.includes(to)){
        let new_size = size + fees[`${from}${to}`]
        const embed = new Discord.RichEmbed()
        embed.setTitle("Shoe Size Converter")
        embed.setColor('#36393F');
        embed.setDescription(`Size ${size} in ${from} is size ${new_size} in ${to}`)
        embed.setTimestamp();
        embed.addField("Invite Opal", "https://bit.ly/invite-opal", true)
        embed.addField("Join the Server", "https://discord.gg/ktShq9q", true)
        embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
        msg.channel.send(embed)
      }
    }
  }
}
