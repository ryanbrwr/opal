const Discord = require("discord.js");

module.exports = {
  name: 'fee',
  description: 'This command will calculate the payouts for every major platform\n`!fee <amount>`\nexample: `!fee 100`',
  async execute(msg) {
    const fees = {
      'StockX Level 1 (12.5%)': n => .125 * n,
      'StockX Level 2 (12.0%)': n => .12 * n,
      'StockX Level 3 (11.5%)': n => .115 * n,
      'StockX Level 4 (11.0%)': n => .11 * n,
      'Goat (12.4% + $5.00)': n => 0.124 * n + 5 ,
      'Ebay (12.9% + $0.30': n => 0.129 * n + 0.3,
      'Paypal (2.9% + $0.30)': n => (0.029 * n) + 0.3,
      'Grailed USA (8.9% + $0.30)': n => 0.089 * n + 0.3,
      'Grailed International (10.4 + $0.30)': n => 0.104*n + 0.3,
    }
    const embed = new Discord.RichEmbed();
    embed.setTitle("Fee Calculator")
    if(msg.content.split(" ").length == 2){
      if(isNaN(msg.content.split(" ")[1])) {
        embed.setColor('#36393F');
        embed.setDescription('Please input a number');
      }
      else {
        const [,number] = msg.content.split(' ');
        embed.setColor('#36393F');
        Object.keys(fees).forEach(fee => {
          embed.addField(`${fee} Payout`, `$${Number(number - fees[fee](number)).toFixed(2)}`);
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
    embed.addField("Invite Opal", "https://bit.ly/invite-opal", true)
    embed.addField("Join the Server", "https://discord.gg/ktShq9q", true)
    embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
    msg.channel.send(embed);
  }
}
