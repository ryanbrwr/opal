const Discord = require("discord.js")
const ms = require("ms")
const schedule = require("node-schedule")
const prompts = ['What do you want to send as a reminder?', 'When do you want to send this reminder (ex. 3s, 3m, 3d, 3h)?']

module.exports = {
  name: 'reminder',
  admin: true,
  description: 'This command will send a reminder to the specified channel\n`!reminder <channel_id>`\nexample: `!reminder 710705901941555250`',
  async execute(msg) {
    let channel_id = msg.content.split(" ")[1]
    let channel = msg.guild.channels.get(channel_id)
    if (channel) {
      let content = msg.content.split(" ")
      let result = await getResponses(msg)
      const confirmEmbed = new Discord.RichEmbed()
      confirmEmbed.setTitle("Reminder")
      confirmEmbed.setDescription(`${msg.author} your message will be sent in ${channel}`)
      confirmEmbed.setColor("#36393F")
      msg.channel.send(confirmEmbed)
      result.endsOn = new Date(Date.now() + ms(result.duration))
      schedule.scheduleJob(result.endsOn, async () => {
        const reminderEmbed = new Discord.RichEmbed()
        reminderEmbed.setTitle("Reminder")
        reminderEmbed.setDescription(result.message)
        reminderEmbed.setColor("#36393F")
        channel.send(reminderEmbed)
      })
    } else {
      msg.reply("Channel does not exist!")
    }
  }
}

async function getResponses(msg) {
  let validTime = /^\d+(s|m|h|d)/;
  const result = { message: null, duration: 60 }
  for (let i = 0; i < prompts.length; i++) {
    await msg.reply(prompts[i])
    const response = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, { max: 1 });
    let content = response.first().content;
    if (i === 0) {
      result.message = content;
    }
    else if (i === 1) {
      if (validTime.test(content)) {
        result.duration = content;
      }
      else {
        msg.reply(":beers: Invalid Time Format")
        throw new Error("Invalid Time Format");
      }
    }
  }
  return result
}