const Discord = require("discord.js")
var Twitter = require('twitter');

var T = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

module.exports = {
    name: 'twitter',
    admin: false,
    description: 'This command will search twitter for the given username\n`!twitter <username>`\nexample: `!twitter OpalSource`',
    async execute(msg) {
        let query = msg.content.split(' ')[1]
        const embed = new Discord.RichEmbed()
        if (query) {
            var params = {
                q: query,
            }
            T.get('users/search', params, function (err, data, response) {
                if (!err) {
                    // This is where the magic will happen
                    let results = JSON.parse(response.body)[0]
                    if (results) {
                        embed.setTitle('Twitter Search')
                        embed.addField('Username', `[@${results.screen_name}](https://twitter.com/${results.screen_name})`, true)
                        embed.addField('Name', results.name, true)
                        embed.addField('Followers', results.followers_count, true)
                        embed.addField('Following', results.friends_count, true)
                        embed.addField('Tweets', results.statuses_count, true)
                        embed.addField('Likes', results.favourites_count, true)
                        setBranding(embed)
                        embed.setThumbnail(results.profile_image_url_https)
                        msg.channel.send(embed)
                    }
                    else {
                        embed.setTitle('Error')
                        embed.setDescription('Could not find user')
                        setBranding(embed)
                        msg.channel.send(embed)
                    }
                } else {
                    embed.setTitle('Error')
                    embed.setDescription('Problem with Twitter API. Try again in a minute')
                    setBranding(embed)
                    msg.channel.send(embed)
                }
            })
        }
        else {
            embed.setTitle('Error')
            embed.setDescription('This command is missing one or more arguments')
            setBranding(embed)
            msg.channel.send(embed)
        }

    }
}
