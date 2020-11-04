const Discord = require('discord.js')
const User = require('./models/users.js')
const mongoose = require('mongoose');

const resendHelp = async (bot, reaction, user) => {
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
}

const updateStatus = (bot) => {
    let members = 0;
    let guilds = 0;
    bot.guilds.cache.forEach((guild) => {
        members += guild.memberCount;
        guilds++;
    })
    bot.user.setActivity(`${guilds} servers | discord.gg/BGzKe2ZPqn`, { type: "WATCHING" })
}

const welcomeGroup = (bot, guild) => {
    guilds = 0;
    bot.guilds.cache.forEach((guild) => {
        guilds++
    })
    const embed = new Discord.MessageEmbed()
        .addField("Server Name", guild.name, true)
        .addField("Server ID", guild.id, true)
        .addField("Owner", guild.owner ? guild.owner : 'N/A', true)
        .addField("Region", guild.region, true)
        .addField("Members", guild.memberCount, true)
        .addField("Server Count", guilds, true)
        .setThumbnail(guild.iconURL)
        .setColor("#61E786")
    bot.channels.cache.get('770377555089031240').send(embed)
}

const byeGroup = (bot, guild) => {
    guilds = 0;
    bot.guilds.cache.forEach((guild) => {
        guilds++
    })
    const embed = new Discord.MessageEmbed()
        .addField("Server Name", guild.name, true)
        .addField("Server ID", guild.id, true)
        .addField("Owner", guild.owner ? guild.owner : 'N/A', true)
        .addField("Region", guild.region, true)
        .addField("Members", guild.memberCount, true)
        .addField("Server Count", guilds, true)
        .setThumbnail(guild.iconURL)
        .setColor("#FF495C")
    bot.channels.cache.get('770377555089031240').send(embed)
}

const checkUser = (author) => {
    try {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        User.findOne({ 'userID': author.id }, 'userID', function (err, person) {
            if (person) {
                return;
            }
            else {
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    userID: author.id
                })
                user.save()
                    .then(() => {
                        const message = `:pray:  **Thanks for using Opal** :pray:\n\n**This is a one time message** to thank you for using **Opal**. **Opal** is a **100% free** discord bot for all of your cook group needs. From stockx checkers to variant grabbers, and over 30 other commands, we have it all. If you enjoy using the bot we ask if you could please upvote us with the link below, it really helps us get our name out even more. If you're interested in adding **Opal** to your own group please join the support server! Instructions to add opal can be found there!\n\n**Official Support Server**:  https://discord.gg/w59m9DB\n**Upvote Us**: https://top.gg/bot/752293928157446184`;
                        author.send(message);
                    })
                    .catch(err => console.log(err))
            }
        });
    } catch (error) {
        console.log(error)
    }
}

global.setBranding = (embed) => {
    embed.setColor('#8666e1');
}

module.exports = { resendHelp, updateStatus, welcomeGroup, byeGroup, checkUser }