const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'crypto',
    admin: false,
    description: 'This command will grab the latest data on the given cryptocurrency\n`!crypto <coin>`\nexample: `!crypto dogecoin`',
    async execute(msg) {
        const embed = new Discord.MessageEmbed()
        if (msg.content.split(' ').length > 1) {
            let query = msg.content.split(' ')
            query.shift()
            query = query.join(' ')
            axios.get('https://api.coingecko.com/api/v3/coins/list')
                .then((response) => {
                    query = query.toLowerCase()
                    let coin = response.data.filter(coin => coin.id.toLowerCase() === query || coin.symbol.toLowerCase() === query || coin.name.toLowerCase() === query)[0]
                    if (coin) {
                        axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&market_data=true&community_data=true`)
                            .then((response) => {
                                embed.setTitle(response.data.name)
                                embed.setURL(response.data.links.homepage[0])
                                embed.addField('Price', `$${response.data.market_data.current_price.usd}`, true)
                                embed.addField('24h High', `$${response.data.market_data.high_24h.usd}`, true)
                                embed.addField('24h Low', `$${response.data.market_data.low_24h.usd}`, true)
                                embed.addField('24h Change', `${response.data.market_data.price_change_percentage_24h}%`, true)
                                embed.addField('Total Volume', response.data.market_data.total_volume.usd, true)
                                embed.addField('CoinGecko Score', response.data.coingecko_score, true)
                                embed.setThumbnail(response.data.image.thumb)
                                setBranding(embed)
                                msg.channel.send(embed)
                            }, (error) => {
                                embed.setTitle('Error')
                                embed.setDescription('error finding coin, please try again later')
                                setBranding(embed)
                                msg.channel.send(embed)
                            })
                    }
                    else {
                        embed.setTitle('Error')
                        embed.setDescription('coin does not exist')
                        setBranding(embed)
                        msg.channel.send(embed)
                    }
                }, (error) => {
                    console.log('error getting coin list, please try again later')
                    setBranding(embed)
                    msg.channel.send(embed)
                })
        }
        else {
            embed.setTitle('Error')
            embed.setDescription('Incorrect number of parameters')
            setBranding(embed)
            msg.channel.send(embed)
        }

    }
}