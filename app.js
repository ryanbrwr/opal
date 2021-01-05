// DEPENDENCIES
require('dotenv').config();
const Discord = require("discord.js");
const { Client, Intents } = require('discord.js');
let intents = new Intents();
intents.add(['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS', 'GUILD_INTEGRATIONS', 'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'])
const bot = new Client({ ws: { intents: intents }, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, bot);
const helpers = require('./helpers.js')
// const Group = require('./models/groups.js')

const fs = require('fs');

// Command handler setup
global.PREFIX = '!';
bot.commands = new Discord.Collection();

global.featureFiles = fs.readdirSync('./features').filter(file => file.endsWith('.js')); // made global for help.js
for (const file of featureFiles) {
    const feature = require(`./features/${file}`);
    bot.commands.set(feature.name, feature);
}

// Posts the server count to DBL
dbl.on('posted', () => {
    console.log('Server count posted!');
})

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

    // Do not allow user without admin, to use admin commands
    const command = bot.commands.get(cmd);
    const isAdmin = msg.member && msg.member.hasPermission("ADMINISTRATOR");
    if (command.admin && !isAdmin) return;

    // Execute command, if all checks pass
    helpers.checkUser(msg.author)

    command.execute(msg)
});

bot.on('ready', () => {
    helpers.updateStatus(bot)
});

bot.on('messageReactionAdd', (reaction, user) => {
    helpers.resendHelp(bot, reaction, user)
})

bot.on('guildMemberAdd', (member) => {
    helpers.checkUser(member)
    helpers.updateStatus(bot);
});

bot.on('guildCreate', (guild) => {
    helpers.updateStatus(bot)
    helpers.welcomeGroup(bot, guild)
})
bot.on('guildDelete', (guild) => {
    helpers.updateStatus(bot)
    helpers.byeGroup(bot, guild)
})

bot.login(process.env.BOT_TOKEN).then(() => {
    console.log('Connected to Mongo and authorized in all servers');
});