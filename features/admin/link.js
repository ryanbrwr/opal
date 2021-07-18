const Discord = require('discord.js');

module.exports = {
    name: 'emoji',
    admin: true,
    description: 'This command will send the link of all the emojis in message\n`!emoji <emojis>`\nexample: `!emoji :some_emojis:\nyou can use more then one emoji in at the same time',
    async execute(msg) {

        if (!args.length) return;

        for (const emojis of args) {
            const g = Discord.Util.parseEmoji(emojis);

            if (g.id) {
                const e = g.animated ? '.gif' : '.png'
                const link = `https://cdn.discordapp.com/emojis/${g.id + e}`

                var emoji = new Discord.MessageEmbed() 
                .setDescription(`[link](${link})`)
                .setImage(link)
                .setColor(msg.author.displayHexColor)
                msg.channel.send(emoji)
                
            }
        }
    }
}