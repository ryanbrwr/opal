const NodeGeocoder = require('node-geocoder');
const Discord = require("discord.js")

module.exports = {
  name: 'triangulate',
  admin: false,
  description: 'This command will give you the longitude and latitude of the given address\n`!triangulate <address>`\nexample: `!triangulate Wall St`',
  async execute(msg) {
    let content = msg.content.split(' ')
    content.shift()
    content = content.join(' ')
    const options = {
	     provider: 'google',
	     apiKey: 'AIzaSyAeCUbyvfoZZkrjS11B0kp9WNVtqb_fFWs',
	      formatter: null
    };
    const geocoder = NodeGeocoder(options);
    const res = await geocoder.geocode(content);
    let latitude = res[0].latitude
    let longitude = res[0].longitude
    const embed = new Discord.RichEmbed()
    embed.setTitle("Spoof")
    embed.setDescription(`The coordinates for this location are **${latitude}, ${longitude}**`)
    embed.setColor("#36393F")
    embed.setTimestamp();
    embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
    
    embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
    msg.channel.send(embed)
  }
}