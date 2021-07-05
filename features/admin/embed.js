const Discord = require('discord.js')

module.exports = {
    name: 'embed',
    admin: true,
    description: 'This command will send a embed message to spicefic channel\n`!embed`\nexample: `!embed then send a description then mention the channel',
    async execute(msg){

    let startmsg = await msg.channel.send('specify the embed description `send a msg without using the command again`');

    const first = m => m.author.id === msg.author.id;
    const firstCollector = new Discord.MessageCollector(msg.channel, first, { max: 2 });

    let des;

    firstCollector.on('collect', async msg => {
        des = msg.content;
    
        msg.channel.send('now mention the channel');
        firstCollector.stop();

        const second = m => m.author.id === msg.author.id;
        const secondCollector = new Discord.MessageCollector(msg.channel, second, { max: 1 });

        secondCollector.on('collect', async msg => {
            let Channel = msg.mentions.channels.first();
            if (!Channel) {
                msg.channel.send('Invalid channel, you can run the command again if you want to restart');
                secondCollector.stop();
                return;
                
            }

        await msg.channel.send('Done');
  

            await embed(des, Channel)
        })

    })



async function embed(des, Channel) {

    const Embed = new Discord.MessageEmbed()

    .setDescription(des)
    .setColor('RANDOM');

let msg = await Channel.send(Embed);
}
    }
}
