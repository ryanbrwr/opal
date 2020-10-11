const Discord = require("discord.js")

module.exports = {
	name: 'delay',
	description: 'This command will tell you how much delay you should add to your tasks',
	async execute(msg) {
    if(msg.content.split(' ').length != 3) return;
    const { content } = msg;
    const tasks = parseFloat(content.split(' ')[1])
    const proxies = parseFloat(content.split(' ')[2])
    const embed = new Discord.RichEmbed()
    embed.setTitle("Delay Calculator");
    embed.setDescription(`With **${tasks}** tasks and **${proxies}** proxies, you should use a **${tasks/proxies*3500}ms** delay`)
    embed.setColor("#36393F")
    embed.setTimestamp();
    embed.addField("Invite Opal", "https://bit.ly/invite-opal", true)
    embed.addField("Join the Server", "https://discord.gg/ktShq9q", true)
    embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
    msg.channel.send(embed)
  }
}
