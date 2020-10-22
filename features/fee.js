const Discord = require("discord.js");

module.exports = {
  name: 'fee',
  admin: false,
  description: 'This command will calculate the payouts for every major platform\n`!fee <amount>`\nexample: `!fee 100`',
  async execute(msg) {
    const fees = {
      'StockX Level 1 (9.5%)': n => .095 * n,
      'StockX Level 2 (9%)': n => .09 * n,
      'StockX Level 3 (8.5%)': n => .085 * n,
      'StockX Level 4 (8%)': n => .08 * n,
      'Goat 90+ (9.5% + $5.00 + 2.9%)': n => 0.095 * n + 5 + (0.905*n*0.029),
      'Goat 70-89 (15% + $5.00 + 2.9%)': n => 0.15 * n + 5 + (0.85*n*0.029),
      'Goat 50-69 (20% + $5.00 + 2.9%)': n => 0.20 * n + 5 + (0.80*n*0.029),
      'Ebay (12.9% + $0.30': n => 0.129 * n + 0.3,
      'Paypal (2.9% + $0.30)': n => (0.029 * n) + 0.3,
      'Grailed (9% + 2.9%)': n => 0.089 * n + 0.911*n*0.029,
    }
    const embed = new Discord.RichEmbed();
    embed.setTitle("Fee Calculator")
    if(msg.content.split(" ").length == 2){
      if(isNaN(msg.content.split(" ")[1])) {
        embed.setDescription('Please input a number');
      }
      else {
        const [,number] = msg.content.split(' ');
        Object.keys(fees).forEach(fee => {
          embed.addField(`${fee} Payout`, `$${Number(number - fees[fee](number)).toFixed(2)}`);
        });
      }
    }
    else if (msg.content.split(" ").length > 2){
      embed.setDescription("This command takes only 1 argument");
    }
    else if (msg.content.split(" ").length == 1){
      embed.setDescription("Please put a price to calculate fees");
    }
    else {
      embed.setDescription("Please input a price")
    }
    setBranding(embed)
    msg.channel.send(embed);
  }
}
