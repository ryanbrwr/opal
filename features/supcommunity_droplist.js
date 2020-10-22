const Discord = require('discord.js')
const axios = require('axios')
const cheerio = require('cheerio')

const re = /[^0-9\/£\$]/g

module.exports = {
  name: 'droplist',
  admin: false,
  description: 'This command will send the latest Supreme droplist\n`!droplist`\nexample: `!droplist`',
  async execute(msg) {
    const args = msg.content.split(' ')
    if (args.length != 1) {
      const embed = new Discord.RichEmbed()
      embed.setTitle("Error")
      embed.setDescription("Command is missing one or more arguments")
      msg.channel.send(embed)
      return
    }

    const base = 'https://www.supremecommunity.com'
    let html = await axios.get(`https://www.supremecommunity.com/season/fall-winter2020/droplists/`);
    let $ = await cheerio.load(html.data);
    let latest_week = $('a[class="block"]').attr("href")

    html = await axios.get(base + latest_week);
    $ = await cheerio.load(html.data);

    const items = []
    $('div[class="card-details"]').each((index, b) => {
      const card = $(b)
      const name = card.attr('data-itemname')
      const price = card.find('span[class="label-price"]').text().replace(re,"")
      items.push({
        name,
        price
      })
    })

    let droplistString = ''
    for (const item of items) {
      if (droplistString !== '') droplistString += '\n'
      droplistString += `${item.name}: ${item.price ? item.price : '**price not known yet**'}`
    }

    const embed = new Discord.RichEmbed()
    embed.setTitle("Latest Supreme Droplist")
    embed.setDescription(droplistString)
    setBranding(embed)
    msg.channel.send(embed)
  }
}