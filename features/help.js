const Discord = require("discord.js");
const fs = require('fs');
const curr = require("./curr");

module.exports = {
  name: 'help',
  admin: false,
  description: 'This command will display this menu\n`!help`\nexample: `!help`',
  async execute(msg) {
    const embeds = []

    let fieldsAdded = 0
    let currentEmbedIndex = 1
    const featureFiles = fs.readdirSync('./features').filter(file => file.endsWith('.js'));
    let currentEmbed = new Discord.RichEmbed()
    currentEmbed.setTitle(`Help Menu - Page ${currentEmbedIndex}/${Math.ceil(featureFiles.length / 5)}`)
    currentEmbed.setDescription("All commands below must be prefixed with `!`, all arguments are surrounded by `<>`")
    for (const file of featureFiles) {
      const feature = require(`./${file}`);
      currentEmbed.addField(feature.name.substring(0, 1).toUpperCase() + feature.name.substring(1), feature.description, false)
      fieldsAdded++
      if (fieldsAdded === 5) {
        fieldsAdded = 0
        currentEmbedIndex++

        embeds.push(currentEmbed)

        currentEmbed = new Discord.RichEmbed()
        currentEmbed.setTitle(`Help Menu - Page ${currentEmbedIndex}/${Math.ceil(featureFiles.length / 5)}`)
        currentEmbed.setDescription("All commands below must be prefixed with `!`, all arguments are surrounded by `<>`")
      }
    }
    embeds.push(currentEmbed)

    let message = await msg.channel.send(embeds[0])
    await message.react('⬅️')
    await message.react('➡️')
    const filter = (reaction, user) => {
      return ['⬅️', '➡️'].includes(reaction.emoji.name) && !user.bot && msg.author.id === user.id
    }
    let i = 0;
    const collector = message.createReactionCollector(filter)
    collector.on("collect", (reaction, user) => {
      let user1 = reaction.users.last()
      reaction.remove(user1)
      if (reaction.emoji.name === '➡️') {
        if (i != embeds.length - 1) {
          i = i + 1;
        }
      } else {
        if (i != 0) {
          i = i - 1;
        }
      }
      message.edit(embeds[i])
    })
  }
}
