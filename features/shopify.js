const Discord = require('discord.js')
const axios = require('axios')

const validProtocol = /^(https?:\/\/)?/

module.exports = {
    name: 'shopify',
    admin: false,
    description: 'This command will check if the given site is a shopify site\n!shopify <site>`\nexample: `!shopify https://kith.com`',
    async execute(msg) {
        const args = msg.content.split(' ')
        if (args.length != 2) {
            const embed = new Discord.RichEmbed()
            embed.setTitle('Shopify')
            embed.setDescription('This command only takes one URL');
            setBranding(embed)
            msg.channel.send(embed);
            return
        }
        let site = args[1].toLowerCase()
        if (!validProtocol.test(site)) {
            const embed = new Discord.RichEmbed()
            embed.setTitle('Shopify')
            embed.setDescription('This is an invalid URL');
            setBranding(embed)
            msg.channel.send(embed);
            return
        }

        const message = await msg.channel.send('*Checking site...*')

        site = site.substring(site.indexOf('://') + 3)
        site = site.substring(0, site.indexOf('/') !== -1 ? site.indexOf('/') : site.length)
        site = 'https://' + site

        axios.get(site + '/admin')
            .then((response) => {
                const isShopifySite = response.request.res.responseUrl.indexOf('myshopify.com')
                const embed = new Discord.RichEmbed()
                embed.setTitle('Shopify')
                setBranding(embed)
                message.edit(embed)
            })
            .catch(() => {
                const embed = new Discord.RichEmbed()
                embed.setTitle('Shopify')
                setBranding(embed)
                message.edit(embed)
            })
    }
}