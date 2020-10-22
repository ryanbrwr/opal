const axios = require("axios")
const Discord = require("discord.js")

function format(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

let timezones = ['America/Los_Angeles', 'America/New_York', "Europe/London", "Europe/Berlin", "Australia/Sydney", "Asia/Hong_Kong", "Asia/Tokyo"]

module.exports = {
    name: 'time',
    admin: false,
    description: 'This command will list out timezones\n`!time`\nexample: `!time`',
    async execute(msg) {
        const embed = new Discord.RichEmbed()
        embed.setTitle("World Clock")
        await Promise.all(timezones.map(async (timezone) => {
            const response = await axios.get(`https://worldtimeapi.org/api/timezone/${timezone}`)
            let { data } = response
            let { datetime, } = data
            datetime = datetime.slice(0, datetime.length -6)
            let date = new Date(datetime);
            let time = format(date, 0)
            let area = timezone.split('/')[1]
            embed.addField(area.replace('_', ' '), time);
        }))
        setBranding(embed)
        msg.channel.send(embed)
    }
}