const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'variants',
    admin: false,
    description: 'This command will give you the variants of a given shopify link\n`!variants <link>`\nexample: `!variants https://kith.com/collections/mens-footwear/products/aafy0152`',
    async execute(msg) {
        const embed = new Discord.MessageEmbed()
        if (msg.content.split(' ').length == 2) {
            let url = msg.content.split(' ')[1]
            axios.get(`${url}.json`)
                .then((response) => {
                    if (response.data.product.variants) {
                        const { product } = response.data
                        embed.setTitle(product.title)
                        embed.setURL(url)
                        embed.setThumbnail(product.images[0].src)
                        product.variants.forEach((variant) => {
                            embed.addField(variant.title, variant.id)
                        })
                        setBranding(embed)
                        msg.channel.send(embed)
                    }
                    else {
                        embed.setTitle('Error')
                        embed.setDescription('No variants found')
                        setBranding(embed)
                        msg.channel.send(embed)
                    }
                }, (error) => {
                    embed.setTitle('Error')
                    embed.setDescription('There was an error with the shopify API. Please try again later.')
                    setBranding(embed)
                    msg.channel.send(embed)
                })
        }
        else {
            embed.setTitle('Error')
            embed.setDescription('Incorrect amount of parameters. Expected: `2`')
            setBranding(embed)
            msg.channel.send(embed)
        }
    }
}