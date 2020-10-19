const Discord = require("discord.js")
const HttpsProxyAgent = require("https-proxy-agent")
const axios = require("axios");

const fs = require('fs')

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.99 Safari/537.36' // Newest Chrome useragent, used to fake the browser for simple antibots
const ALLOWED_FILES = ['txt'] // The file type they're allowed to send proxies in
const MAX_FILE_SIZE = 1024 // 1 MB
const MAX_PROXIES = 100 // Max amount of proxies they're allowed to test at once

module.exports = {
    name: 'proxy',
    description: 'This command will test your proxies against the site given, if there is no site given it\'ll default to google.com\n`!proxy <site>`\nexample: `!proxy https://footlocker.com`',
    async execute(msg) {
        let channel = msg.channel
        if (msg.channel.type !== 'dm') {
            channel = await msg.author.createDM()
            const mbed = new Discord.RichEmbed()
            mbed.setTitle("Proxy Tester")
            mbed.setDescription("A dm with instructions to use this command have been sent to you")
            mbed.setColor("#36393F")
            mbed.setTimestamp();
            mbed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
            mbed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
            msg.channel.send(mbed)
        }

        const arguments = msg.content.split(' ')
        let site
        if (arguments.length !== 0) {
            if (isValidWebUrl(arguments[1])) {
                site = arguments[1]
            }
        }

        const embed = new Discord.RichEmbed()
        embed.setTitle('Proxy Tester')
        embed.setDescription(
            `Please put your proxies in here using one of the following methods
        1. Type one or more proxies in one message separated by newlines
        2. Send a file in here containing all proxies separated by newlines
        **Format**: \`hostname:port:user:pass\`
        `)
        embed.setColor("#36393F")
        embed.setTimestamp();
        embed.addField("\u200b", "[Invite Opal](https://bit.ly/opal-invite) | [Join Server](https://bit.ly/opal-join-discord) | [Twitter](https://twitter.com/OpalSource)", true)
        embed.setFooter("opal.io", "https://i.ibb.co/BG79PK2/opallogo.png")
        await channel.send(embed)
        getResponse(channel, msg.author.id, site)
    }
}

/**
 * Get the next message in the channel given and use it to test the proxies given.
 * @param {string} channel the ID of the channel to get the next message in
 * @param {string} authorid the ID of the author to get the next message of
 * @param {string} site the site to test the parsed proxies against
 */
getResponse = async (channel, authorid, site) => {
    const responses = await channel.awaitMessages(m => m.author.id === authorid, { max: 1 })
    const response = responses.first()

    // If response doesn't exist don't do anything, this SHOULD be a useless check as it waits for messages 
    // but Node is weird sometimes it called for me
    if (!response) {
        return
    }

    const statusMsg = await channel.send(new Discord.RichEmbed().setTitle('Proxy Tester').setDescription('Your proxies are being processed'))

    let proxiesString = ''
    const proxies = []
    if (response.attachments.size === 0) {
        proxiesString = response.content
    } else {
        const attachment = response.attachments.first()
        const fileNameParts = attachment.url.split('.')
        const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase()

        // If the file sent is not in the right file type or its size is too big
        // return and send an error message
        if (!ALLOWED_FILES.includes(fileExtension) || attachment.filesize > MAX_FILE_SIZE) {
            const embed = new Discord.RichEmbed()
            embed.setTitle('Proxy Tester')
            embed.setDescription(
                `Aborted! This is not a valid file type or the file is too big.
                Max file size: ${MAX_FILE_SIZE} KB
                Allowed file types ${ALLOWED_FILES.join(' ')}`)
            channel.send(embed)
            return
        }
        const downloadResponse = await axios.get(attachment.url)
        proxiesString = downloadResponse.data
    }

    for (const proxyLine of proxiesString.split('\n')) {
        const proxyParts = proxyLine.split(':')

        // Invalid amount of data found in file/message
        if (proxyParts.length !== 4) {
            continue
        }

        proxies.push({
            host: proxyParts[0],
            port: proxyParts[1],
            user: proxyParts[2],
            pass: proxyParts[3]
        })
    }

    // If the amount of proxies given are too many return and send error message
    if (proxies.length > MAX_PROXIES) {
        const embed = new Discord.RichEmbed()
        embed.setTitle('Proxy Tester')
        embed.setDescription(`Aborted! You may only send ${MAX_PROXIES} proxies at once.`)
        channel.send(embed)
        return
    }

    let workingProxiesString = ''
    const workingProxies = await testProxies(site, proxies)
    for (const workingProxy of workingProxies) {
        if (workingProxiesString !== '') workingProxiesString += '\n'
        workingProxiesString += `${workingProxy.host}:${workingProxy.port}:${workingProxy.user}:${workingProxy.pass}`
    }

    const embed = new Discord.RichEmbed()
        .setTitle('Proxy Tester')
        .setDescription('Done! These are all the proxies that work on that site.')

    statusMsg.edit(embed)
    fs.writeFileSync(`./proxytests/${authorid}.txt`, workingProxiesString)
    channel.send({ files: [`./proxytests/${authorid}.txt`] })
}

/**
 * Checks proxies against a given site and returns the working ones
 * 
 * @param {string} site the site to check against
 * @param {Object[]} proxies the proxies to check against the site
 * @param {string} proxies[].host the hostname of the proxy
 * @param {number} proxies[].port the port of the proxy
 * @param {string} proxies[].user the username of the proxy
 * @param {string} proxies[].pass the password of the proxy
 * 
 * @returns {Object[]} The proxies that were shown to be working against the given site
 */
testProxies = async (site = 'https://google.com', proxies = []) => {
    const allTasks = []
    const workingProxies = []
    for (const proxy of proxies) {
        allTasks.push(new Promise((resolve, reject) => {
            const httpsAgent = new HttpsProxyAgent({ host: proxy.host, port: proxy.port, auth: `${proxy.user}:${proxy.pass}` })
            const client = axios.create({ httpsAgent, headers: { 'User-Agent': USER_AGENT } })
            client.get(site).then((response) => {
                if (response.status < 400) {
                    workingProxies.push(proxy)
                    resolve()
                    return
                }
            }).catch(reject)
        }))
    }
    await Promise.all(allTasks)
    return workingProxies
}

/**
 * Checks if the url given is valid and returns if it is
 * @param {string} url the url to check
 * 
 * @returns {bool} Whether or not the given url was valid
 */
isValidWebUrl = (url) => {
    let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return regEx.test(url);
}