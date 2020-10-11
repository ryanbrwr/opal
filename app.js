// DEPENDENCIES
const Discord = require("discord.js");
const bot = new Discord.Client();

const fs = require('fs');

require('dotenv').config();
//

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

    const args = msg.content.split(' ');
    let cmd = args.shift();

    // Check if command starts with prefix, if the prefix isn't present this message should be ignored
    if (!cmd.startsWith(PREFIX)) return;

    cmd = cmd.substring(PREFIX.length)

    // If command doesn't exist ignore message
    if (!bot.commands.has(cmd.toLowerCase())) return;

    const command = bot.commands.get(cmd.toLowerCase())
    const isAdmin = msg.member && msg.member.hasPermission("ADMINISTRATOR");
    // If user isn't admin but the command requires it return
    if (command.admin && !isAdmin) return;
    command.execute(msg)
});

bot.on('ready', () => {

});

// LOG IN
bot.login("NzUyMDc2NDc0MDgwODIxMzg5.X1SXzA.LHwY4URJ90dudDzMdSpTwfyijkw").then(() => {
    console.log('authorized in all servers');
});
