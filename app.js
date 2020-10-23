// DEPENDENCIES
const Discord = require("discord.js");
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require('fs');
require('dotenv').config();

// Command handler setup
global.PREFIX = '!';
bot.commands = new Discord.Collection();

global.featureFiles = fs.readdirSync('./features').filter(file => file.endsWith('.js')); // made global for help.js
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

    // Do not allow user without admin, to use admin commands
    const command = bot.commands.get(cmd);
    const isAdmin = msg.member && msg.member.hasPermission("ADMINISTRATOR");
    if (command.admin && !isAdmin) return;

    // Execute command, if all checks pass
    command.execute(msg)
});

bot.on('ready', () => {
    updateStatus()
});

bot.on('messageReactionAdd', async (reaction, user) => {
    // if reaction information is not complete (uncached), retrieve it
    if (reaction.partial) {
		try {
			await reaction.fetch();
        }
        catch {
			return;
		}
    }

    // Do not handle bot or client reactions
    if (user.bot) return;
    if (user.id === bot.user.id) return;

    if (reaction.message.embeds.length > 0) {
        if (reaction.message.embeds[0].title.startsWith('Help Menu')) {
            // Get page info from embed title
            let page = reaction.message.embeds[0].title.slice(17); // 'Help Menu - Page '.length === 17
            page = page.split('/');
            for (let i = 0; i < page.length; i++) page[i] = parseInt(page[i]) - 1;

            // Check reaction emoji and calculate embed page to send
            if (reaction.emoji.name === '➡️') {
                if (page[0] < page[1]) page[0]++;
            }
            else if (reaction.emoji.name === '⬅️') {
                if (page[0] > 0) page[0]--;
            }

            // Make and send embed
            let embed = makeHelpEmbed(page[0]);
            await reaction.message.edit(embed);

            // Remove the user's reaction (so they can react again)
            reaction.users.remove(user);
        }
    }
});

bot.on('guildMemberAdd', (member) => {
    updateStatus();
    welcomeUser(member);
});
bot.on('guildMemberRemove', () => updateStatus())
bot.on('guildCreate', () => updateStatus())
bot.on('guildDelete', () => updateStatus())

// LOG IN
bot.login(process.env.BOT_TOKEN).then(() => {
    console.log('authorized in all servers');
});

const updateStatus = () => {
    let members = 0;
    let guilds = 0;
    bot.guilds.cache.forEach((guild) => {
        members += guild.memberCount;
        guilds++;
    })
    bot.user.setActivity(`${members} people in ${guilds} servers`, { type: "WATCHING" })
}

const welcomeUser = (member) => {
    if(member.guild.id === "752301663510986822") return;
    const message = ":wave: **Welcome to Opal!** :wave: \n\nIt seems you have joined a server I reside in. Who am I? Well I am a **100% free & open source** Discord bot to make your experience in this group seamless. We provide **over 30 features**, all of which can be tested in our support server! Do you own a group? Opal is perfect for you! Can you code or are you willing to learn? Opal has great resources for anyone looking to contribute! \n\nJoin Support Server: https://discord.gg/p8dzvk7\nFollow Opal on Twitter: https://twitter.com/OpalSource\nInvite Opal Link: https://discord.com/api/oauth2/authorize?client_id=752293928157446184&permissions=8&scope=bot";
    member.user.send(message);
}

global.setBranding = (embed) => {
    embed.setColor('#36393F');
    embed.setTimestamp();
    embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true);
    embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png");
}
