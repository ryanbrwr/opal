const Discord = require("discord.js");
const fs = require('fs');

const featuresPerPage = 5; // the number of feature fields per page of embed
var featureFiles = fs.readdirSync('./features').filter(file => file.endsWith('.js'));
var numOfEmbeds = Math.ceil(featureFiles.length / featuresPerPage);

module.exports = {
    name: 'help',
    description: 'This command will display this menu\n`!help`\nexample: `!help`',
    async execute(msg) {
        let embed = makeHelpEmbed(0);
        let message = await msg.channel.send(embed);
        await message.react('⬅️');
        await message.react('➡️');

        // Temp reaction handling (switch to event base handling in Discord.JS v12)
        const filter = (reaction, user) => {
            return ['⬅️', '➡️'].includes(reaction.emoji.name) && !user.bot && msg.author.id === user.id
        }
        let i = 0;
        const collector = message.createReactionCollector(filter)
        collector.on("collect", reaction => {
            reaction.remove(reaction.users.last());

            if (reaction.emoji.name === '➡️') {
                if (i < numOfEmbeds - 1) i++;
            }
            else {
                if (i > 0) i--;
            }

            message.edit(makeHelpEmbed(i));
        });
    }
}

const makeHelpEmbed = (pageIndex) => {
    featureFiles = fs.readdirSync('./features').filter(file => file.endsWith('.js'));
    numOfEmbeds = Math.ceil(featureFiles.length / featuresPerPage);

    let embed = new Discord.RichEmbed();
    embed.setTitle(`Help Menu - Page ${pageIndex + 1}/${numOfEmbeds}`);
    embed.setDescription(`All commands below must be prefixed with \`!\`, all arguments are surrounded by \`<>\``); // TODO: get prefix from env

    for (const file of featureFiles.slice(pageIndex * featuresPerPage, (pageIndex * featuresPerPage) + featuresPerPage)) {
        const feature = require(`./${file}`);
        embed.addField(feature.name[0].toUpperCase() + feature.name.substring(1), feature.description, false);
    }

    return embed;
};

