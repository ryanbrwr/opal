const chalk = require('chalk')

class Setup {
    async update(msg, collection, variable, description) {
        let guild_name = msg.channel.guild.name
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = `[${date} ${time}]`;

        let message = await msg.reply(`${description}. Type "cancel" to cancel this command`);
        const filter = m => m.author.id === msg.author.id && !msg.author.bot;
        msg.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(async (collected) => {
            if (collected.first().content == "cancel") {
                msg.reply(":beers: Cheers!")
            } else {
                let query = {
                    "guild_id": msg.channel.guild.id
                }
                let values = {
                    $set: {
                        [variable]: collected.first().content
                    }
                }
                collection.updateOne(query, values, function(error, res) {
                    if (error) {
                        console.log(chalk.red(dateTime + `[${guild_name}]:`) + ` ${variable} not updated to mongo server`)
                    } else {
                        console.log(chalk.green(dateTime + `[${guild_name}]:`) + ` ${variable} successfully added`)
                        msg.reply(":beers: Cheers!")
                    }
                });
            }
        }).catch(() => {
            msg.reply(":beers: You took too long!")
        });
    }
    async sms(msg, collection, variables, descriptions) {
        let guild_name = msg.channel.guild.name
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = `[${date} ${time}]`;

        let message = await msg.reply(`${descriptions[0]}. Type "cancel" to cancel this command`);
        const filter = m => m.author.id === msg.author.id && !msg.author.bot;
        msg.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(async (collected) => {
            if (collected.first().content == "cancel") {
                msg.reply(":beers: Cheers!")
            } else {
                let query = {
                    "guild_id": msg.channel.guild.id
                }
                let values = {
                    $set: {
                        [variables[0]]: collected.first().content
                    }
                }
                collection.updateOne(query, values, async function(error, res) {
                    if (error) {
                        console.log(chalk.red(dateTime + `[${guild_name}]`) + ` ${variables[0]} not updated to mongo server`)
                    } else {
                        console.log(chalk.green(dateTime + `[${guild_name}]`) + ` ${variables[0]} successfully added`)
                        let message = await msg.reply(`${descriptions[1]}. Type "cancel" to cancel this command`);
                        const filter = m => m.author.id === msg.author.id && !msg.author.bot;
                        msg.channel.awaitMessages(filter, {
                            max: 1,
                            time: 30000,
                            errors: ['time']
                        }).then(async (collected) => {
                            if (collected.first().content == "cancel") {
                                msg.reply(":beers: Cheers!")
                            } else {
                                let query = {
                                    "guild_id": msg.channel.guild.id
                                }
                                let values = {
                                    $set: {
                                        [variables[1]]: collected.first().content
                                    }
                                }
                                collection.updateOne(query, values, async function(error, res) {
                                    if (error) {
                                        console.log(chalk.red(dateTime + `[${guild_name}]`) + ` ${variables[1]} not updated to mongo server`)
                                    } else {
                                        console.log(chalk.green(dateTime + `[${guild_name}]`) + ` ${variables[1]} successfully added`)
                                        let message = await msg.reply(`${descriptions[2]}. Type "cancel" to cancel this command`);
                                        const filter = m => m.author.id === msg.author.id && !msg.author.bot;
                                        msg.channel.awaitMessages(filter, {
                                            max: 1,
                                            time: 30000,
                                            errors: ['time']
                                        }).then(async (collected) => {
                                            if (collected.first().content == "cancel") {
                                                msg.reply(":beers: Cheers!")
                                            } else {
                                                let query = {
                                                    "guild_id": msg.channel.guild.id
                                                }
                                                let values = {
                                                    $set: {
                                                        [variables[2]]: collected.first().content
                                                    }
                                                }
                                                collection.updateOne(query, values, async function(error, res) {
                                                    if (error) {
                                                        console.log(chalk.red(dateTime + `[${guild_name}]`) + ` ${variables[2]} not updated to mongo server`)
                                                    } else {
                                                        console.log(chalk.green(dateTime + `[${guild_name}]`) + ` ${variables[2]} successfully added`)
                                                        msg.reply(":beers: Cheers!")
                                                    }
                                                });
                                            }
                                        }).catch(() => {
                                            msg.reply(":beers: You took too long!")
                                        });
                                    }
                                })
                            }
                        }).catch(() => {
                            msg.reply(":beers: You took too long!")
                        });
                    }
                })
            }
        }).catch(() => {
            msg.reply(":beers: You took too long!")
        });
    }
}
module.exports = Setup
