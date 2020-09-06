const Discord = require("discord.js");
const util = require("util")
class Help{
  async help_message(msg) {
    const embed1 =  new Discord.RichEmbed()
    embed1.setTitle("Help Menu - Page 1/6")
    embed1.setDescription("All commands below must be prefixed with `!`, all arguments are surrounded by `<>`")
    embed1.addField("Add User to Channel", "This command will add the user to an existing channel\n`!add <user>`\nexample: `!add @Brew`")
    embed1.addField("Add Number to SMS List", "This command will add the user's to the server's SMS list\n`!sms add <number>`\nexample: `!sms add 1234567890`")
    embed1.addField("Archive a Channel", "This command will archive an existing channel\n`!archive`\nexample: `!archive`")
    embed1.addField("Alternate Address", "This command will send the user an alternate address\n`!address <address>`\nexample: `!address 100 Jones Street`")
    embed1.addField("BotBroker Search", "This command will search BotBroker and display a resultl\n`!botbroker <bot>`\nexample: `!botbroker cyber`")
    embed1.setColor("#36393F")

    const embed2 = new Discord.RichEmbed()
    embed2.setTitle("Help Menu - Page 2/6")
    embed2.setDescription("All commands below must be prefixed with `!`, all arguments are surrounded by `<>`")
    embed2.addField("Create a Ticket", "This command will create a new ticket\n`!new`\nexample: `!new`")
    embed2.addField("Create a Ticket React Message", "This command will create a ticket react message\n`!ticketreact <channel_id>`\nexample: `!ticketreact 710705901941555250`")
    embed2.addField("Create a Meeting Room", "This command will create a meeting room with the specified users\n`!meeting <name> <users>`\nexample: `!meeting new @brew @matt`")
    embed2.addField("Delay Calculator", "This command will tell you what delays to use based on the number of tasks you have\n`!delay <number of tasks> <number of proxies>`\nexample: `!delay 10 10`")
    embed2.addField("Delete Number from SMS List", "This command will delete the user's number from the server's SMS list\n`!sms delete`\nexample: `!sms delete`")
    embed2.setColor("#36393F")

    const embed3 =  new Discord.RichEmbed()
    embed3.setTitle("Help Menu - Page 3/6")
    embed3.setDescription("All commands below must be prefixed with `!`, all arguments are surrounded by `<>`")
    embed3.addField("Close a Channel", "This command will delete the channel\n`!close`\nexample: `!close`")
    embed3.addField("Download Links", "This command will send the download links of all popular bots\n`!downloads`\nexample: `!downloads`")
    embed3.addField("Embed Creator", "This command will create a new embed\n`!embed <channel_id>`\nexample: `!embed 710705901941555250`")
    embed3.addField("Exchange Currency", "This command will convert currency\n`!convert <amount> <from> <to>`\nexample: `!convert 200 USD EUR`")
    embed3.addField("eBay View Bot", "This command will add 100 views to an eBay listing\n`!ebay <link>`\nexample: `!ebay https://www.ebay.com/xxxxxxxx`")
    embed3.setColor("#36393F")

    const embed4 = new Discord.RichEmbed()
    embed4.setTitle("Help Menu - Page 4/6")
    embed4.setDescription("All commands below must be prefixed with `!`, all arguments are surrounded by `<>`")
    embed4.addField("Email Changer", "This command will change the email given and send it to the user\n`!email <email>`\nexample: `!email brewbotio@gmail.com`")
    embed4.addField("Fee Calculator", "This command will calculate the payouts for every major platform\n`!fee <amount>`\nexample: `!fee 100`")
    embed4.addField("Giveaway Bot", "This command will start a giveaway in the specified channel\n`!giveaway <channel_id>`\nexample: `!giveaway 710705901941555250`")
    embed4.addField("Ping", "This command will test the bot's responsiveness\n`!ping`\nexample: `!ping`")
    embed4.addField("Poll", "This command will send a poll with the question given\n`!poll <question>`\nexample: `!poll how is everyone doing?`")
    embed4.setColor("#36393F")

    const embed5 =  new Discord.RichEmbed()
    embed5.setTitle("Help Menu - Page 5/6")
    embed5.setDescription("All commands below must be prefixed with `!`, all arguments are surrounded by `<>`")
    embed5.addField("Remove User From Channel", "This command will remove the tagged user from the channel\n`!remove <user>`\nexample: `!remove @Brew`")
    embed5.addField("Reminder", "This command will send a reminder to the specified channel\n`!reminder <channel_id>`\nexample: `!reminder 710705901941555250`")
    embed5.addField("Rename a Channel", "This command will rename the current channel\n`!rename <name>`\nexample: `!rename welcome`")
    embed5.addField("Send SMS Message", "This command will send an SMS message to everyone that signed up\n`!sms send <message>`\nexample: `!sms send password page up!`")
    embed5.addField("Shoe Size Converter", "This command will convert shoe sizes from different regions\n`!shoe <size> <from> <to>`\nexample: `!shoe 9.5 US UK`")
    embed5.setColor("#36393F")

    const embed6 = new Discord.RichEmbed()
    embed6.setTitle("Help Menu - Page 6/6")
    embed6.setDescription("All commands below must be prefixed with `!`, all arguments are surrounded by `<>`")
    embed6.addField("Snowflake to Timestamp", "This command will convert the given discord snowflake to a UTC timestamp\n`!snowflake <id>`\nexample: `!snowflake 710705901941555250`")
    embed6.addField("Spoof Location", "This command will convert the given location to latitude and longitude\n`!spoof <location>`\nexample: `!spoof New York City`")
    embed6.addField("Supreme Sellout Times", "This command will send the 5 items that sold out quickest in the most recent supreme drop\n`!sellout <region>`\nexample: `!sellout us`")
    embed6.addField("Supreme Droplist", "This command will send the latest Supreme droplist\n`!droplist`\nexample: `!droplist`")
    embed6.setColor("#36393F")

    let embeds = [embed1, embed2, embed3, embed4, embed5, embed6]

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
          if(i != 5){
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
module.exports = Help;
