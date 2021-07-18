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
    description: 'This command will search funko for the given product\n`!funko <product name>`\nexample: `!funko star wars`',
    async execute(msg) {
        const embed = new Discord.MessageEmbed()
        if (msg.content.split(' ').length != 1) {
            let query = msg.content.split(' ')
            query.shift()
            query = query.join('%20')

            axios.get(`https://www.hobbydb.com/api/catalog_items?include_cit=true&include_count=false&include_main_images=true&market_id=poppriceguide&order=%7B%22name%22:%22created_at%22,%22sort%22:%22desc%22%7D&page=1&serializer=CatalogItemPudbSerializer&subvariants=true&q=${query}`)
                .then((response) => {
                    if(response.data.data.length > 0) {
                        let data = response.data.data[0]
                        embed.setTitle(data.attributes.name)
                        embed.setURL(`https://www.hobbydb.com${data.attributes.urls.catalog_item_link_url}`)
                        embed.addField('Lowest Price', `$${data.attributes.lowest_price}`, true)
                        embed.addField('Stock', data.attributes.collectibles_for_sale_count, true)
                        embed.addField('ID', data.id, true)
                        embed.setThumbnail(data.attributes.images.main_photo_url)
                        setBranding(embed)
                        msg.channel.send(embed)
                    }
                    else {
                        embed.setTitle("Error")
                        embed.setDescription("No results found. Please change your search query or try again later")
                        setBranding(embed)
                        msg.channel.send(embed)
                    }

                }, (error) => {
                    embed.setTitle('Error')
                    embed.setDescription('Error with funko API. Please try again later')
                    setBranding(embed)
                    msg.channel.send(embed)
                });
        }
        else {
            embed.setTitle('Error')
            embed.setDescription('Command is missing one or more parameters')
            setBranding(embed)
            msg.channel.send(embed)
        }
    }
}

