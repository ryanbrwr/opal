module.exports = {
    name: 'sellout',
    description: 'This command will',
    async execute(msg) {
        if (msg.content.split(' ').length != 2) {
            const embed = new Discord.RichEmbed()
            embed.setTitle("Error")
            embed.setDescription("Command is missing one or more arguments")
            embed.setColor("#36393F")
            msg.channel.send(embed)
          }
          else if (msg.content.split(" ")[1].toLowerCase() === "us" || msg.content.split(" ")[1].toLowerCase() === "eu" || msg.content.split(" ")[1].toLowerCase() === "jpn") {
            const base = 'https://www.supremecommunity.com'
            const region = msg.content.split(" ")[1]
            const html1 = await axios.get(`${base}/season/fall-winter2020/times/${region}/`);
            let $ = await cheerio.load(html1.data);
            let latest_week = $('a[class="block"]').attr("href")
            const html2 = await axios.get(`${base}${latest_week}`);
            $ = await cheerio.load(html2.data);
      
            let item1 = $('div[id="item-1"]').text().split("\n")
            item1[8] = item1[8].trim().replace("<br>", "")
            item1[11] = item1[11].trim().replace("<br>", "")
            item1[15] = item1[15].trim().replace("<br>", "")
            let item2 = $('div[id="item-2"]').text().split("\n")
            item2[8] = item2[8].trim().replace("<br>", "")
            item2[11] = item2[11].trim().replace("<br>", "")
            item2[15] = item2[15].trim().replace("<br>", "")
            let item3 = $('div[id="item-3"]').text().split("\n")
            item3[8] = item3[8].trim().replace("<br>", "")
            item3[11] = item3[11].trim().replace("<br>", "")
            item3[15] = item3[15].trim().replace("<br>", "")
            let item4 = $('div[id="item-4"]').text().split("\n")
            item4[8] = item4[8].trim().replace("<br>", "")
            item4[11] = item4[11].trim().replace("<br>", "")
            item4[15] = item4[15].trim().replace("<br>", "")
            let item5 = $('div[id="item-5"]').text().split("\n")
            item5[8] = item5[8].trim().replace("<br>", "")
            item5[11] = item5[11].trim().replace("<br>", "")
            item5[15] = item5[15].trim().replace("<br>", "")
      
            const embed = new Discord.RichEmbed()
            embed.setTitle("Latest Supreme Sellout Times")
            embed.addField(`${item1[8]} | ${item1[11]}`, item1[15])
            embed.addField(`${item2[8]} | ${item2[11]}`, item2[15])
            embed.addField(`${item3[8]} | ${item3[11]}`, item3[15])
            embed.addField(`${item4[8]} | ${item4[11]}`, item4[15])
            embed.addField(`${item5[8]} | ${item5[11]}`, item5[15])
            embed.setColor("#36393F")
            msg.channel.send(embed)
          }
          else {
            const embed = new Discord.RichEmbed()
            embed.setTitle("Error")
            embed.setDescription("Region does not exist")
            embed.setColor("#36393F")
            msg.channel.send(embed)
          }
    }
}