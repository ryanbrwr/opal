const Discord = require('discord.js')
const axios = require('axios')

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

module.exports = {
    name: 'funko',
    admin: false,
    description: 'This command will display the latency between Discord and our servers\n`!ping`\nexample: `!ping`',
    async execute(msg) {
        let query = msg.content.split(' ')
        query.shift()
        query.join(' ')

        const embed = new Discord.MessageEmbed()

        axios.post('https://www.funko.com/api/search/template', {
            type: "shop",
            sort: { createdAt: "desc" },
            term: query,
            pageCount: 1,
            page: 1
        })
            .then((response) => {
                const { hits } = response.data
                if (hits.length > 0) {
                    let releaseDate = new Date(hits[0].createdAt)
                    let day = releaseDate.getDay()
                    let month = releaseDate.getMonth()

                    embed.setTitle('Funko Search')
                    embed.addField('Product', [hits[0].title](`https://www.funko.com/shop/details/${hits[0].handle}`), true)
                    embed.addField('ID', hits[0].uid, true)
                    embed.addField('Product Type', hits[0].productType, true)
                    embed.addField('Release Date', `${day}/${month}`, true)
                    embed.addField('Price', formatter.format(hits[0].price), true)
                    embed.addField('In Stock', hits[0].variants[0].inventory, true)
                    embed.setThumbnail(hits[0].media[0].src)
                    setBranding(embed)
                    msg.channel.send(embed)
                }
                else {

                }

            }, (error) => {
                console.log(error);
            });
    }
}

