module.exports = {
    name: 'droplist',
    description: 'This command will',
    async execute(msg) {
        if (msg.content.split(" ").length != 1) {
            const embed = new Discord.RichEmbed()
            embed.setTitle("Error")
            embed.setDescription("Command is missing one or more arguments")
            embed.setColor("#36393F")
            msg.channel.send(embed)
          }
          else {
            const base = 'https://www.supremecommunity.com'
            const html1 = await axios.get(`https://www.supremecommunity.com/season/fall-winter2020/droplists/`);
            let $ = await cheerio.load(html1.data);
            let latest_week = $('a[class="block"]').attr("href")
            const html2 = await axios.get(`${base}${latest_week}`);
            $ = await cheerio.load(html2.data);
            this.items = []
            this.complete = []
            $('div[class="card-details"]').each((a, b) => {
              this.items.push($(b).attr("data-itemname"))
            })
            $('span[class="label-price"]').each((a, b) => {
              this.complete.push(`${this.items[a]} | ${$(b).text().trim()}`)
            })
            this.complete = this.complete.join('\n')
            const embed = new Discord.RichEmbed()
            embed.setTitle("Latest Supreme Droplist")
            embed.setDescription(this.complete)
            embed.setColor("#36393F")
            msg.channel.send(embed)
          }
    }
}