const Discord = require("discord.js")
const Group = require('../models/groups.js')
const mongoose = require('mongoose')


// var keywordListObj = { keyword, channelIDList: [] };
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
// Group.findOneAndUpdate(
//     { groupID: '752301663510986822' },
//     { $push: { keywordList: keywordListObj } },
//     function (error, success) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log(success);
//         }
//     }
// );

kwOptions = ['add', 'remove', 'edit']

const add = async () => {

}
const remove = async () => {
    
}
const edit = async () => {
    
}

module.exports = {
  name: 'kwedit',
  admin: false,
  description: 'This command will display the latency between Discord and our servers\n`!ping`\nexample: `!ping`',
  async execute(msg) {
    const filter = m => kwOptions.includes(m.content) && m.author.id === msg.author.id;
    
    msg.channel.send('Would you like to `add`, `remove` or `edit` a keyword?').then(() => {
        msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                console.log(collected.first().content)
            })
            .catch(collected => {
                msg.channel.send('You did not answer within `60` seconds. Please try again.');
            });
    });
  }
}