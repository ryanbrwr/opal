const Discord = require("discord.js")
const ms = require("ms")
const schedule = require("node-schedule")
const prompts = ["What is the item you are giving away?", "How long is the giveaway? (ex. 3s, 3m, 3h, 3d)", "How many winners?"]

module.exports = {
  name: 'giveaway',
  admin: true,
  description: 'This command will start a giveaway in the specified channel\n`!giveaway <channel_id>`\nexample: `!giveaway 710705901941555250`',
  async execute(msg) {
    let content = msg.content.split(' ')
    let id = content[1]
    let channel = msg.guild.channels.get(id)
    if(channel){
      const result = await getResponses(msg)
      const embed = new Discord.RichEmbed()
        .addField("Item", result.item)
        .addField("Duration", result.duration)
        .addField("Winners", result.winners)
        .setColor("#36393F")
      const message = await msg.channel.send(embed)
      await message.react("👍")
      await message.react("👎")

      const filter = (reaction, user) => ['👍', '👎' ].includes(reaction.emoji.name) && !user.bot && user.id === msg.author.id
      const reactions = await message.awaitReactions(filter, {max:1, time:60000, errors: ['time']})
      const choice = reactions.get("👍") || reactions.get("👎")
      if(choice.emoji.name === "👍")
      {
        message.delete(500)
        result.endsOn = new Date(Date.now() + ms(result.duration))
        const giveawayEmbed = new Discord.RichEmbed()
        giveawayEmbed.setDescription(`**Prize**: ${result.item}\n**Number of Winners**: ${result.winners}\n**Ends On**: ${result.endsOn}\n\n**REACT WITH 🎉 TO ENTER **`)
        giveawayEmbed.setColor("#36393F")
        const giveawayMsg = await channel.send("**GIVEAWAY TIME**", giveawayEmbed);
        await giveawayMsg.react('🎉')
        result.messageId = giveawayMsg.id;
        result.messageId = giveawayMsg.guild.id;
        result.channelId = giveawayMsg.channel.id;
        schedule.scheduleJob(result.endsOn, async () => {
          const giveawayReactions = giveawayMsg.reactions.get("🎉")
          const users = giveawayReactions.users
          const entries = users.filter(user => !user.bot).array()
          if(giveawayMsg.embeds.length === 1){
            giveawayMsg.delete(500)
            let winners = determineWinners(entries, result.winners);
            winners = winners.map(user => user.toString()).join(' ')
            const winEmbed = new Discord.RichEmbed()
            winEmbed.setTitle(result.title)
            winEmbed.setDescription(`The winner(s) of **${result.item}** are ${winners}, message ${msg.author} to claim!`)
            winEmbed.setColor("#36393F")
            channel.send(winEmbed)
          }
        })
      }
      else
      {
        message.delete(500)
      }
    } else {
      msg.reply(":beers: This channel does not exist");
    }
  }
}

  async function getResponses(msg){
    let validTime = /^\d+(s|m|h|d)/;
    let validNumber = /^\d+/;
    const result = {item: null, duration: 60, winners: 1}
    for(let i =0; i < prompts.length; i++){
      await msg.reply(prompts[i])
      const response = await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {max:1});
      const { content } = response.first();
      if(i===0) {
        result.item = content;
      }
      else if(i===1) {
        if(validTime.test(content)){
          result.duration = content;
        }
        else {
          msg.reply(":beers: Invalid Time Format")
          throw new Error("Invalid Time Format");
        }
      }
      else if(i === 2)
      {
        if(validNumber.test(content)) {
          result.winners = content
        }
        else {
          msg.reply(":beers: Invalid entry for winners")
          throw new Error("Invalid entry for winners")
        }
      }
    }
    return result
  }
  function determineWinners(users, max){
    if(users.length <= max) return users;
    const numbers = new Set();
    const winnersArray = [];
    let i = 0;
    while(i < max) {
      const random = Math.floor(Math.Random() * users.length);
      const selected = users[random]
      if(numbers.has(random)) {
        winnersArray.push(selected)
        i++;
      }
    }
    return winnersArray;
  }