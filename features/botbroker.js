const cheerio = require('cheerio')
const axios = require('axios')
const Discord = require("discord.js")

module.exports = {
    name: 'botbroker',
    admin: false,
	description: 'This command will scrape bot broker and check the recent prices of the given bot\n`!botbroker <bot>`\nexample: `!botbroker cyber',
	async execute(msg) {
        if (msg.content.split(' ').length < 2) {
            const embed = new Discord.RichEmbed()
            embed.setTitle("BotBroker Prices")
            embed.setDescription("Your command is missing one or more arguments")
            embed.setColor("#36393F")
        } else {
            let arg = msg.content.split(" ")[1]
            let bots = [{
                    name: "cyber aio",
                },
                {
                    name: "dashe",
                },
                {
                    name: "prism",
                },
                {
                    name: "adept supreme",
                },
                {
                    name: "balko",
                },
                {
                    name: "splashforce",
                },
                {
                    name: "wrath",
                },
                {
                    name: "velox",
                },
                {
                    name: "phantom",
                },
                {
                    name: "project destroyer",
                },
                {
                    name: "mekpreme",
                },
                {
                    name: "swiftaio",
                }
            ]
            this.count = 0;
            bots.some((bot) => {
                if (bot.name.includes(arg)) {
                    let name = bot.name.split(" ").join('-')
                    this.url = `https://botbroker.io/products/${name}`
                    this.count = this.count + 1;
                }
            })
            if (this.count == 0) {
                const embed = new Discord.RichEmbed()
                embed.setTitle("BotBroker Prices")
                embed.setDescription("This bot is not listed on BotBroker")
                embed.setColor("#36393F")
                embed.setTimestamp();
                embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
                
                embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
                msg.channel.send(embed)
            } else {

                const html = await axios.get(this.url);
                const $ = await cheerio.load(html.data);
                let bot_name = $(".bot-name").text().trim()
                let categories = $(".mb-1").text()
                let bot_categories = []
                if (categories.includes("SUPREME")) {
                    bot_categories.push("Supreme")
                }
                if (categories.includes("FOOTSITES")) {
                    bot_categories.push("Footsites")
                }
                if (categories.includes("MESH")) {
                    bot_categories.push("Mesh")
                }
                if (categories.includes("SHOPIFY")) {
                    bot_categories.push("Shopify")
                }
                if (categories.includes("ADIDAS")) {
                    bot_categories.push("Adidas")
                }
                if (categories.includes("YEEZYSUPPLY")) {
                    bot_categories.push("Yeezy Supply")
                }
                if (categories.includes("NIKE")) {
                    bot_categories.push("Nike")
                }
                $("a").each((a, b) => {
                    if ($(b).attr('href').includes("twitter")) {
                        this.twitter = $(b).attr('href')
                        this.twitter_username = $(b).attr('href').substring(20)
                        return false;
                    }
                })
                let prices = $(".pl-md-4").text().split(" ")
                prices = prices.filter((price) => price.startsWith("$"))
                let lowest_ask = prices[0].trim()
                let highest_bid = prices[1].trim()
                let cats = bot_categories.join(' | ')

                let embed = new Discord.RichEmbed()
                embed.setTitle(bot_name)
                embed.setURL(this.url)
                embed.addField("Categories", cats)
                embed.addField("Lowest Ask", lowest_ask)
                embed.addField("Highest Bid", highest_bid)
                embed.addField("Twitter", `[@${this.twitter_username}](${this.twitter})`)
                embed.setTimestamp();
                embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
                
                embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
                msg.channel.send(embed)
            }
        }
    }
}
