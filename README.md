[![Release](https://img.shields.io/github/release/ryanbrew/opal.svg)](https://github.com/ryanbrew/opal/releases/latest)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![GitHub contributors](https://img.shields.io/github/contributors/ryanbrew/opal.svg)](https://github.com/ryanbrew/opal/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/ryanbrew/opal.svg)](https://GitHub.com/RyanBrew/opal/issues/)
[![GitHub stars](https://img.shields.io/github/stars/ryanbrew/opal.svg?style=social&label=Star)](https://github.com/ryanbrew/opal)
[![Discord](https://discordapp.com/api/guilds/752301663510986822/widget.png)](https://discord.gg/KgbZDrS)
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)





<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/RyanBrew/opal">
    <img src="opal_logo.png" alt="Logo" width="128" height="128">
  </a>
</p>



<!-- ABOUT THE PROJECT -->
## About The Project
[Invite Opal](https://discord.com/api/oauth2/authorize?client_id=752293928157446184&permissions=8&scope=bot)

This project started out in January of 2020 and aims to provide the best tools for sneaker groups. I was in a group myself, and realized that people could truly benefit from an all in one discord bot.  

Here's why:
* Your time should be focused on other things rather than looking for sneaker information
* You shouldn't have to exit the tab to look up currency conversions
* You should be able to search for sneaker prices directly from discord

Of course there is a ton more that will be added to Opal in the near future. I will be making more updates and adding new features consistently as time goes on.

### Built With

* [Node.js](https://nodejs.org)
* [MongoDB](https://www.mongodb.com)


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Read the [Feature Template](./template.md)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Installation

These are specific instructions for forking and testing your new features.

1. Fork the project
2. Download and install dependencies (`npm install`)
3. Set environment variables
  - BOT_TOKEN
4. Test your work! (`node app.js`)


<!-- USAGE EXAMPLES -->
## Command list

Opal currently supports the following commands:

* address <address> - Displays an alternate address
* botbroker <bot> - Scrapes BotBroker and checks recent prices of the given bot
* crypto <coin> - Grabs the lates data on the given cryptocurrency
* convert <amount> <from> <to> - Converts one currency to another
* downloads - Displays download links of all major bots.
* email <email> - Changes the email given and sends it to the user
* embed <channel_id> - Creates a new embed in the specified channel.
* fee <amount> - Calculates the payouts for the specified amount for every major platform
* funko <product name> - This command will search funko for the given product
* giveaway <channel_id> - Starts a giveaway in the specified channel.
* goat <product name> - Fetches and displays product information from Goat
* help - Displays the help menu.
* make <desired amount> - Displays the sale price needed on major platforms for your item in order to get your desired payout amount
* parcel <tracking> - Displays the tracking data of a given parcel.
* ping - Displays the latency between Discord and our servers.
* poll <channelid> - Sends a poll to the specified channel.
* proxy <site> - Tests your proxies against the specified site
* reminder <channel_id> - Sends a reminder to the specified channel.
* shoe <size> <from> <to> - Converts shoe sizes from different regions
* shopify <site> - Checks if the specified site is a shopify site
* snowflake <id> - Converts the specified Discord snowflake to a UTC timestamp.
* stockx <product name> - Displays the specified product's information from StockX
* droplist - Displays the latest Supreme drop list.
* sellout - Displays the 5 most quickly sold out items from the most recent Supreme drop.
* time - Displays time zones.
* triangulate <address> - Displays the longitude and latitude of the specified address.
* twitter <username> - Displays information about the given username / query
* variant <shopify link> - Displays all of the product variants for the given shopify product

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/RyanBrew/opal/issues) for a list of proposed features (and known issues).

<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact
[@ryanbrwr](https://twitter.com/ryanbrwr) || [My Github](https://github.com/RyanBrew/)
