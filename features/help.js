const Discord = require("discord.js");
const fs = require('fs');

const featuresPerPage = 5; // the number of feature fields per page of embed
numOfEmbeds = Math.ceil(featureFiles.length / featuresPerPage);

module.exports = {
    name: 'help',
    description: 'This command will display this menu\n`!help`\nexample: `!help`',
    async execute(msg) {
        let embed = makeHelpEmbed(0);
        let message = await msg.channel.send(embed);

        await message.react('⬅️');
        await message.react('➡️');
    }
}

global.makeHelpEmbed = (pageIndex) => {
    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Help Menu - Page ${pageIndex + 1}/${numOfEmbeds}`);
    embed.setDescription(`All commands below must be prefixed with \`${PREFIX}\`, all arguments are surrounded by \`<>\``);

    for (const file of featureFiles.slice(pageIndex * featuresPerPage, (pageIndex * featuresPerPage) + featuresPerPage)) {
        const feature = require(`./${file}`);
        embed.addField(feature.name[0].toUpperCase() + feature.name.substring(1), feature.description, false);
    }

    return embed;
};

