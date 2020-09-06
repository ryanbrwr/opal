const NodeGeocoder = require('node-geocoder');
const Discord = require("discord.js")
class Geocoder {
  async convert(msg) {
    let content = msg.content.split(" ")
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
    msg.channel.send(embed)
  }
}
module.exports = Geocoder;
