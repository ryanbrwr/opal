const CurrencyLayerClient = require('currencylayer-client');
let client = new CurrencyLayerClient({apiKey: 'a563c44266b73b1fdacfcbf2788400c4'});
const Discord = require("discord.js")

module.exports = {
  name: 'convert',
  admin: false,
	description: 'This command will convert currency\n`!convert <amount> <from> <to>`\nexample: `!convert 200 USD EUR`',
	async execute(msg) {
    let content = msg.content.split(' ')
    let amt = parseFloat(content[1])
    let arg1 = content[2].toUpperCase()
    let arg2 = content[3].toUpperCase()
    client.live()
    .then((r) => {
    	 if(arg1 == "USD") {
        if(r['quotes'][`USD${arg2}`]){
          const embed = new Discord.RichEmbed()
          embed.setTitle("Currency Exchange");
          embed.setDescription(`${amt} ${arg1} is ${(r['quotes'][`USD${arg2}`] * amt).toFixed(2)} ${arg2}`)
          setBranding(embed)
          msg.channel.send(embed)
        }
        else {
          const embed = new Discord.RichEmbed()
          embed.setTitle("Currency Exchange");
          embed.setDescription(`We do not currently support ${arg2}`)
          setBranding(embed)
          msg.channel.send(embed)
        }
      } else {
        if(r['quotes'][`USD${arg1}`]) {
          let usd = amt / r['quotes'][`USD${arg1}`]
          if(r['quotes'][`USD${arg2}`]){
            const embed = new Discord.RichEmbed()
            embed.setTitle("Currency Exchange");
            embed.setDescription(`${amt} ${arg1} is ${(usd * r['quotes'][`USD${arg2}`]).toFixed(2)} ${arg2}`)
            setBranding(embed)
            msg.channel.send(embed)
          } else {
              const embed = new Discord.RichEmbed()
              embed.setTitle("Currency Exchange");
              embed.setDescription(`We do not currently support ${arg2}`)
              setBranding(embed)
              msg.channel.send(embed)
          }
        } else {
            const embed = new Discord.RichEmbed()
            embed.setTitle("Currency Exchange");
            embed.setDescription(`We do not currently support ${arg1}`)
            setBranding(embed)
            msg.channel.send(embed)
        }
      }
    })
    .catch(err => {
      console.log(err.code)    // 104
      console.log(err.message) // Your monthly usage limit has been reached...
    })
  }
}