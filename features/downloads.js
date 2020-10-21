const Discord = require("discord.js")

module.exports = {
  name: 'downloads',
  admin: false,
	description: 'This command will list the download links of all major bots\n`!downloads`\nexample: `!downloads`',
	async execute(msg) {
    const embed = new Discord.RichEmbed()
    embed.setTitle("Bot Download Links")
    embed.setColor('#36393F');
    embed.addField("\u200b",
    "[ANB AIO](http://bit.ly/ANB-AIO-Setup)\n"+
    "[ANB AIO V2](http://downloadsv2.aiobot.com/)\n"+
    "[BNB](http://bnba.io/download-bnb)\n"+
    "[Balko (Mac - Zip)](http://rb.gy/6ya323)\n"+
    "[Balko (Mac)](http://rb.gy/zagmsj)\n"+
    "[Balko (Windows)](https://rb.gy/stcykc)\n"+
    "[Balko Cookie Extension](https://s3.amazonaws.com/balkobot.com/BalkoExtension.zip)\n"+
    "[CyberAIO](https://rb.gy/4q2cck)\n"+
    "[Dashe](http://rb.gy/iceabf)\n"+
    "[EveAIO](https://rb.gy/lmzgya)\n"+
    "[EveCaptcha (Mac)](https://rb.gy/4mnhky)\n"+
    "[EveCaptcha (Windows)](https://rb.gy/enmpff)\n",
      true
    )
    embed.addField("\u200b",
    "[EveX](https://rb.gy/1uvr3k)\n"+
    "[Ghost Cookie Extension](https://ghost.shoes/l/extension)\n"+
    "[Ghost Phantom](https://ghost.shoes/l/phantom/)\n"+
    "[Ghost SNKRS](https://update.ghostaio.com/)\n"+
    "[HasteyIO](https://update.hastey.io/)\n"+
    "[HawkMesh](http://download.hawkmesh.com/)\n"+
    "[Kodai](https://kodai.io/download)\n"+
    "[Latchkey](http://download.latchkeybots.io/)\n"+
    "[Mek (Mac)](http://rb.gy/vfqugi)\n"+
    "[Mek (Windows)](https://rb.gy/n3w6hc)\n"+
    "[NSB (Mac)](https://nsb.nyc3.digitaloceanspaces.com/NSB-mac-latest.exe)\n"+
    "[NSB (Windows)](http://rb.gy/imkhez)\n",
      true
    )
    embed.addField("\u200b",
    "[PD Nike](https://swoosh.projectdestroyer.com/download)\n"+
    "[PD Shopify](https://shopify.projectdestroyer.com/download)\n"+
    "[SoleAIO](https://drive.google.com/open?id=1GRpzE8Ofc2fY_ueNwvut4QjoKm4SdpGr)\n"+
    "[SplashForce](https://update.splashforce.io/)\n"+
    "[TSB (Mac)](http://rb.gy/wmuofz)\n"+
    "[TSB (Windows)](http://rb.gy/1zkoab)\n"+
    "[The Kick Station](https://rb.gy/dwkiln)\n"+
    "[Tohru AIO](https://tohru.io/download)\n"+
    "[Velox (Mac)](http://rb.gy/q3yb3s)\n"+
    "[Velox (Windows)](https://rb.gy/fn5jz8)\n"+
    "[Wrath](https://download.wrathbots.co/)",
      true
    )
    embed.setTimestamp();
    embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
    embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
    msg.channel.send(embed)
  }
}