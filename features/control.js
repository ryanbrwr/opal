const Discord = require("discord.js")
class Control {
	async add(message, id) {
		let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(id));
		if (!user) {
			const err1 = new Discord.RichEmbed()
			err1.setColor('#36393F');
			err1.setDescription(`Please mention a valid user.`)
			err1.setTitle("Add User")
			return message.channel.send(err1);
		} else {
			message.channel.overwritePermissions(user, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true,
				ATTACH_FILES: true
			});
			const added = new Discord.RichEmbed()
			added.setColor('#36393F');
			added.setDescription(`${user} has been added.`)
			added.setTitle("Add User")
			message.channel.send(added);
		}
	}
	async remove(message, id) {
		let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(id));
		if (!user) {
			const err1 = new Discord.RichEmbed()
			err1.setTitle('Remove User')
			err1.setColor('#36393F');
			err1.setDescription(`Please mention a valid user.`)
			return message.channel.send(err1);
		} else {
			message.channel.overwritePermissions(user, {
				SEND_MESSAGES: false,
				READ_MESSAGES: false,
				ATTACH_FILES: false
			});
			const added = new Discord.RichEmbed()
			added.setTitle('Remove User')
			added.setColor('#36393F');
			added.setDescription(`${user} has been removed`)
			message.channel.send(added);
		}
	}
	async archive(msg) {
		let guild = msg.guild
		let category = msg.guild.channels.find(c => c.name == "Archive" && c.type == "category")
		if (category) {
			msg.channel.setParent(category.id)
		} else {
			let archive = await guild.createChannel('Archive', {
					type: 'category',
					permissionsOverwrites: [{
						id: guild.id,
						deny: ['MANAGE_MESSAGES'],
						allow: ['SEND_MESSAGES']
					}]
				})
				.then()
				.catch(console.error);
			category = msg.guild.channels.find(c => c.name == "Archive" && c.type == "category")
			msg.channel.setParent(category.id)
		}
		const archive = new Discord.RichEmbed()
		archive.setTitle('Archive Channel')
		archive.setColor('#36393F');
		archive.setDescription(`${msg.channel} has been archived`)
		archive.setTimestamp();
		archive.addField("Invite Opal", "https://bit.ly/invite-opal", true)
        archive.addField("Join the Server", "https://discord.gg/ktShq9q", true)
    	archive.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
		msg.channel.send(archive)
	}
	async meeting(guild, msg) {
		if (msg.content.split(' ').length < 4) {
      const err1 = new Discord.RichEmbed()
			err1.setColor('#36393F');
			err1.setDescription("Incorrect use of `!meeting` type `!help` for the correct usage.")
			err1.setTitle("Create a Meeting")
      return msg.channel.send(err1)
		} else {
			let meeting = await guild.createChannel(`meeting-${msg.content.split(' ')[1]}`, {
					type: 'text',
					permissionsOverwrites: [{
						id: guild.id,
						deny: ['MANAGE_MESSAGES'],
						allow: ['SEND_MESSAGES']
					}]
				})
				.then(async c => {
					c.overwritePermissions(msg.guild.defaultRole, {
						VIEW_CHANNEL: false,
						SEND_MESSAGES: false
					})
					let user1 = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(msg.content.split(' ')[2]));
					let user2 = msg.guild.member(msg.mentions.users.last() || msg.guild.members.get(msg.content.split(' ')[3]));
					if (!user1 || !user2) {
						const err1 = new Discord.RichEmbed()
						err1.setColor('#36393F');
						err1.setDescription(`Please mention valid users.`)
						err1.setTitle("Add User")
						return c.send(err1);
					} else {
						c.overwritePermissions(user1, {
							SEND_MESSAGES: true,
							READ_MESSAGES: true,
							ATTACH_FILES: true
						});
						c.overwritePermissions(user2, {
							SEND_MESSAGES: true,
							READ_MESSAGES: true,
							ATTACH_FILES: true
						});
						const added = new Discord.RichEmbed()
						added.setColor('#36393F');
						added.setDescription(`${user1} & ${user2} have been added.`)
						added.setTitle("Add User")
						c.send(added);
					}
				})
				.catch(console.error);
		}
	}
	async ticket(guild, msg, config, user, react) {
		if (msg.content.split(' ').length > 1 && !react) {
      const err1 = new Discord.RichEmbed()
			err1.setColor('#36393F');
			err1.setDescription("Incorrect use of `!ticket` type `!help` for the correct usage.")
			err1.setTitle("Tickets")
      return user.send(err1)
		} else {
			let meeting = await guild.createChannel(`ticket-${user.username}${user.discriminator}`, {
					type: 'text',
					permissionsOverwrites: [{
						id: guild.id,
						deny: ['MANAGE_MESSAGES'],
						allow: ['SEND_MESSAGES']
					}]
				})
				.then(async c => {
					if(config.ticket_category){
						c.setParent(config.ticket_category)
					}
					c.overwritePermissions(guild.defaultRole, {
						VIEW_CHANNEL: false,
						SEND_MESSAGES: false
					})
					let supportRole = guild.roles.find(r=> r.name === config.staff_role)
					if (!supportRole) return c.send("No Support Team role found.");
					c.overwritePermissions(user, {
						SEND_MESSAGES: true,
						READ_MESSAGES: true,
						ATTACH_FILES: true
					});
					c.overwritePermissions(supportRole, {
						SEND_MESSAGES: true,
						READ_MESSAGES: true,
						ATTACH_FILES: true
					});
					const added = new Discord.RichEmbed()
					added.setColor('#36393F');
					added.setDescription(`${user} has opened a ticket for ${user.username} ${supportRole}. React With 🔒 to close this ticket.`)
					added.setTitle("Ticket Created")
					let ticket_message = await c.send(added);
					await ticket_message.react('🔒')
					const filter = (reaction, user) => ['🔒'].includes(reaction.emoji.name) && !user.bot
					const collector = ticket_message.createReactionCollector(filter)
			    collector.on("collect", (reaction, user) => {
			        c.delete()
			    })

					const embed = new Discord.RichEmbed()
					embed.setColor('#36393F');
					embed.setDescription(`${c} has been created ${user}`)
					embed.setTitle("Ticket Created")
					user.send(embed)
				}).catch(console.error);
		}
	}
	async ticketreact(bot, msg, guild, config){
			let channel_id = msg.content.split(" ")[1];
			let channel = msg.guild.channels.get(channel_id);
			if(channel) {
				const embed = new Discord.RichEmbed()
				embed.setTitle("Open a Ticket")
				embed.setDescription("Please react to the message to open a support ticket")
				embed.setColor("#36393F");
				let message = channel.send(embed)
					.then(async (m) => {
						await m.react('📬')
						const filter = (reaction, user) => {
							return ['📬'].includes(reaction.emoji.name) && reaction.users.last().id != bot.user.id
						}
						const collector = m.createReactionCollector(filter)
						collector.on("collect", (reaction, user) => {
								let user1 = reaction.users.last()
								reaction.remove(user1)
									.then((r) => {
										this.ticket(guild, msg, config, user1, true)
									})
									.catch((err) => {
									})
						})
					})
					.catch(err => {
					})
			}
			else {
			}
	}
}
module.exports = Control;
