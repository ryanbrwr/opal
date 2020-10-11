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
	client.commands.set(feature.name, feature);
}
 
bot.on('message', (msg) => {
    let sum = 0;
    bot.guilds.forEach((guild) => {
        sum += guild.members.size
    })
    bot.user.setActivity(`Serving ${sum} people in ${bot.guilds.size} servers`)
 
    // Sender is a bot and should not be served
    if(msg.author.bot) return;
 
    // Sender is the bot itself and should not be served
    if (msg.author.id === bot.user.id) return;
 
    const args = msg.split(' ');
    const command = args.shift();
 
    // Check if command starts with prefix, if the prefix isn't present this message should be ignored
    if (!command.startsWith(PREFIX)) return;
 
    for (const command of bot.commands) {
       if (command.name.equalsIgnoreCase(command)) return;   
  
       const isAdmin = msg.member && msg.member.hasPermission("ADMINISTRATOR");
       // If user isn't admin but the command requires it return
       if (command.admin && !isAdmin) return; 
       
       command.execute(msg)
    }
});

bot.on('ready', () => {

});

// LOG IN
bot.login(process.env.BOT_TOKEN).then(() => {
console.log('authorized in all servers');
});
