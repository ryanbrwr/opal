const Discord = require("discord.js");

module.exports = {
  name: 'make',
  admin: false,
  description: 'This command will calculate what you need to price your item at in order to get your desired price. \n`!make <desired amount>`\nexample: `!make 100`',
  async execute(msg) {
    const fees = {
      'StockX Level 1 (9.5%)': n => 1.095 * n,
      'StockX Level 2 (9%)': n => 1.09 * n,
      'StockX Level 3 (8.5%)': n => 1.085 * n,
      'StockX Level 4 (8%)': n => 1.08 * n,
      'Goat 90+ (9.5% + $5.00 + 2.9%)': n => 1.095 * n + 5 + (1.095*n*0.029),
      'Goat 70-89 (15% + $5.00 + 2.9%)': n => 1.15 * n + 5 + (1.15*n*0.029),
      'Goat 50-69 (20% + $5.00 + 2.9%)': n => 1.20 * n + 5 + (1.2*n*0.029),
      'Ebay (12.9% + $0.30': n => 1.129 * n + 0.3,
      'Paypal (2.9% + $0.30)': n => (1.029 * n) + 0.3,
      'Grailed (9% + 2.9%)': n => 1.089 * n + 1.089*n*0.029,
    }
    const embed = new Discord.RichEmbed();
    embed.setTitle("Set Price At")
    if(msg.content.split(" ").length == 2){
      if(isNaN(msg.content.split(" ")[1])) {
        embed.setColor('#36393F');
        embed.setDescription('Please input a number');
      }
      else {
        const [,number] = msg.content.split(' ');
        embed.setColor('#36393F');
        Object.keys(fees).forEach(fee => {
          embed.addField(`${fee} Payout`, `$${Number(fees[fee](number)).toFixed(2)}`);
        });
      }
    }
    else if (msg.content.split(" ").length > 2){
      embed.setDescription("This command takes only 1 argument");
      embed.setColor('#36393F');
    }
    else if (msg.content.split(" ").length == 1){
      embed.setDescription("Please put a price to calculate fees");
      embed.setColor('#36393F');
    }
    else {
      embed.setDescription("Please input a price")
      embed.setColor('#36393F');
    }
    embed.setTimestamp();
    embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
    
    embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
    msg.channel.send(embed);
  }
}
