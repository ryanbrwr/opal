const Discord = require('discord.js');

module.exports = {
	name: 'email',
	admin: false,
	description: 'This command will change the email given and send it to the user\n`!email <email>`\nexample: `!email brewbotio@gmail.com`',
	async execute(msg) {
		msg.delete(500)
		const embed = new Discord.RichEmbed();
		embed.setTitle("Email Changer")
		if (msg.content.split(" ").length == 2) {
			var one = Math.round(Math.random() * 9);
			var two = Math.round(Math.random() * 9);
			var three = Math.round(Math.random() * 9);
			var four = Math.round(Math.random() * 9);
			var pre_email = msg.content;
			var pre_email = pre_email.split(" ");
			var pre_email = pre_email[1];
			var split = pre_email.split("@");
			var number = "+" + one.toString() + two.toString() + three.toString() + four.toString();
			var email = split[0] + number + "@" + split[1]
			embed.setDescription(email);
			setBranding(embed)
			msg.author.send(embed);

			const mbed = new Discord.RichEmbed();
			mbed.setTitle("Email Changer")
			mbed.setDescription('Email Address Changer used! Type `!email <address>` to use it!');
			setBranding(mbed)
			msg.channel.send(mbed);
		} else {
			const embed = new Discord.RichEmbed();
			embed.setDescription('Please input one email at a time');
			setBranding(embed)
			msg.author.send(embed);
		}
	}
}
