// DEPENDENCIES
const Discord = require("discord.js");
const bot = new Discord.Client();

const fs = require('fs');

require('dotenv').config();

// Command handler setup
const PREFIX = '!';
bot.commands = new Discord.Collection();

const featureFiles = fs.readdirSync('./features').filter(file => file.endsWith('.js'));
for (const file of featureFiles) {
    const feature = require(`./features/${file}`);
    bot.commands.set(feature.name, feature);
}

bot.on('message', (msg) => {
    // Sender is a bot and should not be served
    if (msg.author.bot) return;

    // Sender is the bot itself and should not be served
    if (msg.author.id === bot.user.id) return;
    
    // Message does not start with prefix and should be ignored
    if (!msg.content.startsWith(PREFIX)) return;
    
    const args = msg.content.split(' ');
    let cmd = args.shift();
    
    // Strip pure command name, in all lowercase
    cmd = cmd.substring(PREFIX.length).toLowerCase();
    
    // If command doesn't exist ignore message
    if (!bot.commands.has(cmd)) return;

    const command = bot.commands.get(cmd);
    const isAdmin = msg.member && msg.member.hasPermission("ADMINISTRATOR");
    // If user isn't admin but the command requires it return
    if (command.admin && !isAdmin) return;
    command.execute(msg)
});

bot.on('ready', () => {
    updateStatus()
});

bot.on('guildMemberAdd', (member) => {
    updateStatus();
    welcomeUser(member);
});
bot.on('guildMemberRemove', (member) => {
    updateStatus()
})
bot.on('guildCreate', () => updateStatus())
bot.on('guildDelete', () => updateStatus())

// LOG IN
bot.login(process.env.BOT_TOKEN).then(() => {
    console.log('authorized in all servers');
});

const updateStatus = () => {
    let members = 0;
    let guilds = 0;
    bot.guilds.forEach((guild) => {
        members += guild.members.size
        guilds++
    })
    bot.user.setActivity(`${members} people in ${guilds} servers`, { type: "WATCHING" })
}

const welcomeUser = (member) => {
    const embed = new Discord.RichEmbed();
    embed.setTitle("Opal Welcomes You")
    embed.setDescription(`Opal would like to welcome you to **${member.guild}**! Opal is an open source discord bot for all your cook group related needs.`)
    embed.setTimestamp();
    embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
    
    embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
    member.user.send(embed)
}
