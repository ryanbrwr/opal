const Discord = require("discord.js");

module.exports = {
  name: 'help',
  description: 'This command will display this menu',
  async execute(msg) {
    const embed1 =  new Discord.RichEmbed()
    embed1.setTitle("Help Menu - Page 1/4")
    embed1.setDescription("All commands below must be prefixed with `!`, all arguments are surrounded by `<>`")
    embed1.addField("Archive a Channel", "This command will archive an existing channel\n`!archive`\nexample: `!archive`")
    embed1.addField("Alternate Address", "This command will send the user an alternate address\n`!address <address>`\nexample: `!address 100 Jones Street`")
    embed1.addField("Delay Calculator", "This command will tell you what delays to use based on the number of tasks you have\n`!delay <number of tasks> <number of proxies>`\nexample: `!delay 10 10`")
    embed1.addField("Download Links", "This command will send the download links of all popular bots\n`!downloads`\nexample: `!downloads`")
    embed1.addField("Embed Creator", "This command will create a new embed\n`!embed <channel_id>`\nexample: `!embed 710705901941555250`")
    // embed1.addField("BotBroker Search", "This command will search BotBroker and display a resultl\n`!botbroker <bot>`\nexample: `!botbroker cyber`")
    embed1.setColor("#36393F")

    const embed2 = new Discord.RichEmbed()
    embed2.setTitle("Help Menu - Page 2/4")
    embed2.setDescription("All commands below must be prefixed with `!`, all arguments are surrounded by `<>`")
    embed2.addField("Exchange Currency", "This command will convert currency\n`!convert <amount> <from> <to>`\nexample: `!convert 200 USD EUR`")
    embed2.addField("eBay View Bot", "This command will add 100 views to an eBay listing\n`!ebay <link>`\nexample: `!ebay https://www.ebay.com/xxxxxxxx`")
    embed2.addField("Email Changer", "This command will change the email given and send it to the user\n`!email <email>`\nexample: `!email brewbotio@gmail.com`")
    embed2.addField("Fee Calculator", "This command will calculate the payouts for every major platform\n`!fee <amount>`\nexample: `!fee 100`")
    embed2.addField("Giveaway Bot", "This command will start a giveaway in the specified channel\n`!giveaway <channel_id>`\nexample: `!giveaway 710705901941555250`")
    embed2.setColor("#36393F")

    const embed3 =  new Discord.RichEmbed()
    embed3.setTitle("Help Menu - Page 3/4")
    embed3.setDescription("All commands below must be prefixed with `!`, all arguments are surrounded by `<>`")
    embed3.addField("Ping", "This command will test the bot's responsiveness\n`!ping`\nexample: `!ping`")
    embed3.addField("Poll", "This command will send a poll with the question given\n`!poll <question>`\nexample: `!poll how is everyone doing?`")
    embed3.addField("Reminder", "This command will send a reminder to the specified channel\n`!reminder <channel_id>`\nexample: `!reminder 710705901941555250`")
    embed3.addField("Rename a Channel", "This command will rename the current channel\n`!rename <name>`\nexample: `!rename welcome`")
    embed3.addField("Shoe Size Converter", "This command will convert shoe sizes from different regions\n`!shoe <size> <from> <to>`\nexample: `!shoe 9.5 US UK`")
    embed3.setColor("#36393F")

    const embed4 = new Discord.RichEmbed()
    embed4.setTitle("Help Menu - Page 4/4")
    embed4.setDescription("All commands below must be prefixed with `!`, all arguments are surrounded by `<>`")
    embed4.addField("Snowflake to Timestamp", "This command will convert the given discord snowflake to a UTC timestamp\n`!snowflake <id>`\nexample: `!snowflake 710705901941555250`")
    embed4.addField("Spoof Location", "This command will convert the given location to latitude and longitude\n`!spoof <location>`\nexample: `!spoof New York City`")
    embed4.addField("Supreme Sellout Times", "This command will send the 5 items that sold out quickest in the most recent supreme drop\n`!sellout <region>`\nexample: `!sellout us`")
    embed4.addField("Supreme Droplist", "This command will send the latest Supreme droplist\n`!droplist`\nexample: `!droplist`")
    embed4.setColor("#36393F")

    let embeds = [embed1, embed2, embed3, embed4]

    let message = await msg.channel.send(embed1)
    await message.react('⬅️')
    await message.react('➡️')
    const filter = (reaction, user) => {
      return ['⬅️','➡️'].includes(reaction.emoji.name) && !user.bot && msg.author.id === user.id
    }
    let i = 0;
    const collector = message.createReactionCollector(filter)
    collector.on("collect", (reaction, user) => {
        let user1 = reaction.users.last()
        reaction.remove(user1)
        if(reaction.emoji.name === '➡️') {
          if(i != 3){
            i = i +1;
          }
        } else {
          if(i != 0){
            i = i -1;
          }
        }
        message.edit(embeds[i])
    })
  }
}
