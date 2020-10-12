const https = require('https');
const Discord = require("discord.js")

function format(date, offset) {
    var hours = date.getHours() + offset;
    var minutes = date.getMinutes();
    var ampm = hours > 24 ? 'am' : 'pm';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

let timezones = ['America/Los_Angeles', 'America/New_York', "Europe/London", "Europe/Berlin", "Australia/Sydney", "Asia/Hong_Kong", "Asia/Tokyo"]

module.exports = {
    name: 'time',
    description: 'This command will list out timezones',
    async execute(msg) {
        const embed = new Discord.RichEmbed()
        embed.setTitle("Timezones")
        timezones.forEach(async (timezone) => {
            https.get(`https://worldtimeapi.org/api/timezone/${timezone}`, async (resp) => {
                let data = ''
                resp.on('data', (chunk) => {
                    data += chunk;
                });
            
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    console.log("HI")
                    data = JSON.parse(data);
                    let { datetime, utc_offset } = data
                    let date = new Date(datetime);
                    let offset = parseInt(utc_offset.slice(0,3)) + 4;
                    let time = format(date, offset)
                    let area = timezone.split('/')[1]
                    embed.addField(area, time);
                });
            
            }).on("error", (err) => {
                const error = new Discord.RichEmbed()
                error.setTitle("Error");
                error.setDescription("Error getting current time")
                msg.channel.send(error)
                return
            });
        })
        embed.setColor("#36393F")
        embed.setTimestamp();
        embed.addField("Invite Opal", "https://bit.ly/invite-opal", true)
        embed.addField("Join the Server", "https://discord.gg/ktShq9q", true)
        embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
        msg.channel.send(embed)
    }
}