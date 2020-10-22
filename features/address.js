const Discord = require("discord.js");

module.exports = {
    name: 'address',
    admin: false,
	description: 'This command will send the user an alternate address\n`!address <address>`\nexample: `!address 100 Jones Street`',
	async execute(msg) {
		msg.delete(500)
            let one = String.fromCharCode(65 + Math.round(Math.random() * 25));
            let two = Math.round(Math.random() * 9);
            let three = Math.round(Math.random() * 9);
            let four = Math.round(Math.random() * 9);
            let address = msg.content;
            address = address.split(" ");
            let number = one + two.toString() + three.toString() + four.toString();
            let length = address.length - 1;
            address = address.splice(1, length);
            for (var i = 0; i < address.length; i++) {
                address[i] = address[i].toLowerCase();
                if (address[i] == "avenue") {
                    address[i] = "Ave";
                } else if (address[i] == "ave") {
                    address[i] = "Avenue";
                } else if (address[i] == "boulevard") {
                    address[i] = "Blvd";
                } else if (address[i] == "blvd") {
                    address[i] = "boulevard";
                } else if (address[i] == "circle") {
                    address[i] = "Cir";
                } else if (address[i] == "cir") {
                    address[i] = "Circle";
                } else if (address[i] == "court") {
                    address[i] = "Ct";
                } else if (address[i] == "ct") {
                    address[i] = "Court";
                } else if (address[i] == "lane") {
                    address[i] = "Ln";
                } else if (address[i] == "ln") {
                    address[i] = "Lane";
                } else if (address[i] == "road") {
                    address[i] = "Rd";
                } else if (address[i] == "rd") {
                    address[i] = "Road";
                } else if (address[i] == "square") {
                    address[i] = "SQ";
                } else if (address[i] == "sq") {
                    address[i] = "Square";
                } else if (address[i] == "street") {
                    address[i] = "St";
                } else if (address[i] == "west") {
                    address[i] = "W";
                } else if (address[i] == "w") {
                    address[i] = "West";
                } else if (address[i] == "east") {
                    address[i] = "E";
                } else if (address[i] == "e") {
                    address[i] = "East";
                } else if (address[i] == "north") {
                    address[i] = "N";
                } else if (address[i] == "n") {
                    address[i] = "North";
                } else if (address[i] == "south") {
                    address[i] = "S";
                } else if (address[i] == "s") {
                    address[i] = "South";
                } else if (address[i] == "northeast") {
                    address[i] = "NE";
                } else if (address[i] == "ne") {
                    address[i] = "Northeast";
                } else if (address[i] == "northwest") {
                    address[i] = "NW";
                } else if (address[i] == "nw") {
                    address[i] = "Northwest";
                } else if (address[i] == "southeast") {
                    address[i] = "SE";
                } else if (address[i] == "se") {
                    address[i] = "Southeast";
                } else if (address[i] == "southwest") {
                    address[i] = "SW";
                } else if (address[i] == "sw") {
                    address[i] = "Southwest";
                }
                address[i] = address[i].charAt(0).toUpperCase() + address[i].slice(1);
            }
            let pre_addy = address.join(" ");
            let addy = number + " " + pre_addy;
            const embed = new Discord.RichEmbed();
            embed.setTitle("Address Changer");
            embed.setDescription(addy);
            setBranding(embed)
            msg.author.send(embed);

            const mbed = new Discord.RichEmbed();
            mbed.setTitle("Address Changer");
            mbed.setDescription('Address Changer used! Type `!address <address>` to use it!');
            setBranding(mbed)
            msg.channel.send(mbed);
	},
};
