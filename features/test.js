const Twitter = require("twitter")
const dotenv = require("dotenv")
const fs = require("fs")
const config = require("./config.json");
const axios = require("axios");
const client = new Twitter({
    consumer_key: config.TWITTER_API_PUBLIC,
    consumer_secret: config.TWITTER_API_SECRET,
    access_token_key: config.TWITTER_ACCESS_TOKEN,
    access_token_secret: config.TWITTER_ACCESS_SECRET,
  });
const group_name = config.GROUP_NAME;

class Test {
  async post(url, name){
    let imageUrl = 'https://media.discordapp.net/attachments/678809729463746580/679143034792706048/image0.jpg'
    const image = await axios.get(imageUrl, { responseType: 'arraybuffer' }); // Binary Buffer
    const media = await client.post('media/upload', { media: image.data }).catch(err => err);

    client.post("media/upload", {media: image.data}, function(error, media, response) {
      if (error) {
        console.log(error)
      } else {
        const status = {
          status: `Success from ${name} in ${group_name}`,
          media_ids: media.media_id_string
        }
 
    client.post("statuses/update", status, function(error, tweet, response) {
      if (error) {
        console.log(error)
      } else {
        console.log("Successfully tweeted an image!")
      }
    })
  }
  })
  }

}

module.exports = Test;