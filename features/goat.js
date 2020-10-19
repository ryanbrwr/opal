const Discord = require('discord.js')
const axios = require('axios');

module.exports = {
    name: 'goat',
    description: 'This command will fetch and display product information from Goat\n`!goat <product name>`\nexample: `!goat air force 1`',
    async execute(msg) {
        const args = msg.content.split(' ');
        if (args.length < 2) {
            // Invalid use
            const embed = new Discord.RichEmbed();
            embed.setTitle('Error');
            embed.setDescription('Command is missing one or more arguments.\nUsage: ``!goat <product name>``');
            embed.setColor('#36393F');
            msg.channel.send(embed);
            return;
        }

        const base = 'https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.25.1&x-algolia-application-id=2FWOTDVM2O&x-algolia-api-key=ac96de6fef0e02bb95d433d8d5c7038a';
        // Extract search query from message and format body
        let query = args.slice(1).join(" ");
        let body = `{"params":"distinct=true&facetFilters=()&hitsPerPage=1&page=0&query=${query}"}`;

        // Make POST request
        let resp = await axios.post(base, body);
        if (resp.status !== 200 || resp.data === '') {
            // Error occured
            const embed = new Discord.RichEmbed();
            embed.setTitle('Error');
            embed.setDescription('Could not access Goat at this time. Please try again later.');
            embed.setColor('#36393F');
            msg.channel.send(embed);
            return;
        }

        // Clean up JSON object
        let respObj = resp.data['hits'][0];
        if (respObj == null) {
             // Error occured or product was not found
             const embed = new Discord.RichEmbed();
             embed.setTitle('Error');
             embed.setDescription('Product was most likely not found on Goat. Please try again later.');
             embed.setColor('#36393F');
             msg.channel.send(embed);
             return;
        }

        // Make Discord response embed
        const embed = new Discord.RichEmbed();

        embed.setTitle(respObj['name']);
        embed.setURL('https://www.goat.com/sneakers/' + respObj['slug'])
        embed.addField("Brand", respObj['brand_name'], true);
        embed.addField("Color", respObj['color'], true);

        let releaseDate = new Date(respObj['release_date']);
        embed.addField("Release Date", `${releaseDate.getFullYear()}-${releaseDate.getMonth()}-${releaseDate.getDate()}`, true);

        embed.addField("Size", respObj['size'], true);
        embed.addField('Retail Price (USD)', (respObj['retail_price_cents_usd']/100).toFixed(2), true);
        embed.addField('Lowest Price (USD)', (respObj['lowest_price_cents_usd']/100).toFixed(2), true);

        embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", false);
        embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png");
        if (respObj['has_picture']) embed.setThumbnail(respObj['main_picture_url']);
        embed.setTimestamp();

        msg.channel.send(embed);
    }
}
