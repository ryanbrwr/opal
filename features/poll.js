const Discord = require("discord.js")

module.exports = {
  name: 'poll',
  description: 'This command will send a poll to the channel given\n`!poll <channelid>`\nexample: `!poll 752895041035753515`',
  async execute(msg) {
    let content = msg.content.split(" ")
    let channel_id = content[1]
    let channel = msg.guild.channels.get(channel_id)
    if(channel) {
      await msg.reply("What do you want to ask?")
      const response = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {max:1});
      let question = response.first().content
      const embed = new Discord.RichEmbed()
      embed.setTitle(question)
      embed.setColor("#36393F")
      let poll = await channel.send(embed)
      await poll.react('👍')
      await poll.react('👎')
      await poll.react('🤷')
      msg.reply(`All done! You can see your poll in ${channel}`)
    } else {
      msg.reply("Channel does not exist")
    }
  }
}
