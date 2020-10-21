const cheerio = require('cheerio')
const axios = require('axios')

module.exports = {
  name: 'parcel',
  admin: false,
  description: 'This command will display the data of the given parcel\n`!parcel <tracking>`\nexample: `!parcel x`',
  async execute(msg) {
    let content = msg.content.split(' ')
    if(content.length != 3) return
    let type = content[1]
    let number = content[2]
    const html = await axios.get(`http://shipit-api.herokuapp.com/api/carriers/${type}/${number}`);
    const $ = await cheerio.load(html.data);
    console.log($("pre").text())
  }
}
