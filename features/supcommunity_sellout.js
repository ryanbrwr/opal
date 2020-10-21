const Discord = require('discord.js')
const axios = require('axios')
const cheerio = require('cheerio')

const re = /[^0-9a-zA-Z\- ]/g

const ALLOWED_REGIONS = [
  'us',
  'eu',
  'jpn'
]

module.exports = {
  name: 'sellout',
  admin: false,
  description: 'This command will send the 5 items that sold out quickest in the most recent supreme drop`!sellout <region>`\nexample: `!sellout us`',
  async execute(msg) {
    const args = msg.content.split(' ')
    if (args.length != 2) {
      const embed = new Discord.RichEmbed()
      embed.setTitle("Error")
      embed.setDescription("Command is missing one or more arguments")
      embed.setColor("#36393F")
      embed.setTimestamp();
      embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
      embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
      msg.channel.send(embed)
      return
    }

    if (!ALLOWED_REGIONS.includes(args[1].toLowerCase())) {
      const embed = new Discord.RichEmbed()
      embed.setTitle("Error")
      embed.setDescription("Region does not exist")
      embed.setColor("#36393F")
      embed.setTimestamp();
      embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
      embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
      msg.channel.send(embed)
      return
    }

    const base = 'https://www.supremecommunity.com'
    const region = args[1]

    let html = await axios.get(`${base}/season/fall-winter2020/times/${region}`);
    let $ = await cheerio.load(html.data);
    let last_week = $('a[class="block"]').attr("href")

    html = await axios.get(`${base}${last_week}`);
    $ = await cheerio.load(html.data);

    const items = []

    $('div[class="row sellout-item"]').each((index, b) => {
      // Only add first 5
      if (index >= 5) return

      const selloutItem = $(b)

      const name = selloutItem.find('div[class="col-xs-12 sellout-name"]').text().replace(re,"").trim()
      const colourway = selloutItem.find('div[class="col-xs-6 sellout-colorway"]').text().replace(re, "").trim()

      items.push({
        name,
        colourway
      })
    })

    const embed = new Discord.RichEmbed()
    embed.setTitle("Latest Supreme Sellout Times")
    
    for (let index = 0; index < items.length; index++) {
      const item = items[index]
      embed.addField(`#${index+1}`, `${item.name} | ${item.colourway}`)
    }

    embed.setColor("#36393F")
    embed.setTimestamp();
    embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
    embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
    msg.channel.send(embed)

  }
}