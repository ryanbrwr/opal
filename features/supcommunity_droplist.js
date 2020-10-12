const Discord = require('discord.js')
const axios = require('axios')
const cheerio = require('cheerio')

const re = /[^0-9\/£\$]/g

module.exports = {
  name: 'droplist',
  description: 'This command will',
  async execute(msg) {
    const args = msg.content.split(' ')
    if (args.length != 1) {
      const embed = new Discord.RichEmbed()
      embed.setTitle("Error")
      embed.setDescription("Command is missing one or more arguments")
      embed.setColor("#36393F")
      msg.channel.send(embed)
      return
    }

    const base = 'https://www.supremecommunity.com/season/fall-winter2020/droplist/'
    const date = new Date()
    const nextThursday = date.getDate() + (7 - date.getDay() + 4) % 7
    const latest_week = `${date.getFullYear()}-${(date.getMonth() + 1).length === 1 ? '0' + date.getMonth() + 1 : date.getMonth() + 1}-${nextThursday.length === 1 ? '0' + nextThursday : nextThursday}`
    //const latest_week = '2020-10-08'
    const html = await axios.get(base + latest_week);
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
      droplistString += `${item.name}: ${item.price ? item.price : '**price unknown**'}`
    }

    const embed = new Discord.RichEmbed()
    embed.setTitle("Latest Supreme Droplist")
    embed.setDescription(droplistString)
    embed.setColor("#36393F")
    msg.channel.send(embed)
  }
}