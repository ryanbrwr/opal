const Discord = require("discord.js")
const prompts = ['What do you want the title of the embed to be?', 'What do you want the description of the embed to be?', "What do you want the color of the embed to be (must start with #)"]

module.exports = {
  name: 'embed',
  admin: true,
  description: 'This command will create a new embed`!embed <channel_id>`\nexample: `!embed 710705901941555250`',
  async execute(msg) {
    if (msg.content.split(' ').length == 2) {
      let channel_id = msg.content.split(' ')[1]
      let channel = msg.guild.channels.get(channel_id)
      if (channel) {
        let result = await getResponses(msg)
        const embed = new Discord.RichEmbed()
        embed.setTitle(result.title)
        embed.setDescription(result.description)
        embed.setColor(result.color)
        channel.send(embed)
      }
      else {
        msg.reply("Channel does not exist")
      }
    } else {
      const embed = new Discord.RichEmbed()
      embed.setTitle("Error")
      embed.setDescription("Command is missing one or more arguments")
      embed.setColor("#36393F")
      msg.channel.send(embed)
    }
  }
}

async function getResponses(msg) {
  const result = { title: null, description: null, color: null }
  for (let i = 0; i < prompts.length; i++) {
    await msg.reply(prompts[i])
    const response = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, { max: 1 });
    let content = response.first().content;
    if (i === 0) {
      result.title = content;
    }
    else if (i === 1) {
      result.description = content
    }
    else {
      result.color = content
    }
  }
  return result
}
