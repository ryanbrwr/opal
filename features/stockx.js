const Discord = require('discord.js')
const axios = require('axios');

module.exports = {
    name: 'stockx',
    admin: false,
    description: 'This command will fetch and display product information from StockX\n`!stockx <product name>`\nexample: `!stockx supreme box logo`',
    async execute(msg) {
        const args = msg.content.split(' ');
        if (args.length < 2) {
            // Invalid use
            const embed = new Discord.RichEmbed();
            embed.setTitle('Error');
            embed.setDescription('Command is missing one or more arguments.\nUsage: ``!stockx <product name>``');
            embed.setColor("#36393F")
            embed.setTimestamp();
            embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
            embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
            msg.channel.send(embed);
            return;
        }

        const base = 'https://xw7sbct9v6-dsn.algolia.net/1/indexes/products/query?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser&x-algolia-application-id=XW7SBCT9V6&x-algolia-api-key=6bfb5abee4dcd8cea8f0ca1ca085c2b3';
        // Extract search query from message and format body
        let query = args.slice(1).join(" ");
        let body = `{"params":"distinct=true&facetFilters=()&hitsPerPage=1&page=0&query=${query}"}`;

        // Make POST request
        let resp = await axios.post(base, body);
        if (resp.status !== 200 || resp.data === '') {
            // Error occured
            const embed = new Discord.RichEmbed();
            embed.setTitle('Error');
            embed.setDescription('Could not access StockX at this time. Please try again later.');
            embed.setColor('#36393F');
            embed.setTimestamp();
            embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
            embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
            msg.channel.send(embed);
            return;
        }

        // Clean up JSON object
        let respObj = resp.data['hits'][0];
        if (respObj == null) {
             // Error occured or product was not found
            const embed = new Discord.RichEmbed();
            embed.setTitle('Error');
            embed.setDescription('Product was most likely not found on StockX. Please try again later.');
            embed.setColor("#36393F")
            embed.setTimestamp();
            embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
            embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
            msg.channel.send(embed);
            return;
        }

        // Make Discord response embed
        const embed = new Discord.RichEmbed();

        embed.setTitle(respObj['name']);
        embed.setURL('https://stockx.com/' + respObj['url'])

        embed.addField("Release Date", `${respObj['release_date']}`, true);
        embed.addField("Color", respObj['colorway'], true);
        embed.addField('Retail Price (USD)', respObj['price'].toFixed(2), true);
        embed.addField('Highest Bid (USD)', respObj['highest_bid'].toFixed(2), true);
        embed.addField('Lowest Ask (USD)', respObj['lowest_ask'].toFixed(2), true);
        embed.addField('Last Sale (USD)', respObj['last_sale'].toFixed(2), true);

        embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", false);
        embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png");

        embed.setThumbnail(respObj['thumbnail_url']);
        embed.setTimestamp();

        msg.channel.send(embed);
    }
}
