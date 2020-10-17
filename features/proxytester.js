const Discord = require("discord.js")
const HttpsProxyAgent = require("https-proxy-agent")
const axios = require("axios");

const fs = require('fs')

module.exports = {
    name: 'proxytester',
    description: 'This command will test your proxies',
    async execute(msg) {
        let channel = msg.channel
        if (msg.channel.type !== 'dm') {
            channel = await msg.author.createDM()
        }

        const embed = new Discord.RichEmbed()
        embed.setTitle('Proxy Tester')
        embed.setDescription(
            `Please put your proxies in here using one of the following methods
        1. Type it in here message by message
        2. Type multiple proxies in one message separated by newlines
        3. Send a file in here containing all proxies separated by newlines
        **Format**: \`hostname:port:user:pass\`
        `)
        await channel.send(embed)
        await getResponses(channel, msg.author.id)
    }
}

async function getResponses(channel, authorid) {
    const responses = await channel.awaitMessages(m => m.author.id === authorid, { max: 1 })
    const response = responses.first()
    if (!response) {
        return
    }

    const statusMsg = await channel.send('*Your proxies are being processed*')

    const proxies = []
    if (response.attachments.size === 0) {
        for (const proxyLine of response.content.split('\n')) {
            const proxyParts = proxyLine.split(':')
            // Invalid syntax
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
    } else {
        console.log(response.attachments)
    }
    let workingProxiesString = ''
    const workingProxies = await testProxies(proxies)
    for (const workingProxy of workingProxies) {
        if (workingProxiesString !== '') workingProxiesString += '\n'
        workingProxiesString += `${workingProxy.host}:${workingProxy.port}:${workingProxy.user}:${workingProxy.pass}`
    }

    statusMsg.edit(new Discord.RichEmbed().setTitle('Proxy Tester').setDescription('Done! These are all the proxies that work on that site.'))
    fs.writeFileSync(`./proxytests/${authorid}.txt`, workingProxiesString)
    channel.send({ files: [`./proxytests/${authorid}.txt`] })
}


testProxies = async (proxies = []) => {
    const workingProxies = []
    for (const proxy of proxies) {
        const httpsAgent = new HttpsProxyAgent({ host: proxy.host, port: proxy.port, auth: `${proxy.user}:${proxy.pass}` })
        const client = axios.create({ httpsAgent })
        const response = await client.get('https://google.com')
        if (response.status < 400) {
            workingProxies.push(proxy)
        }
    }
    return workingProxies
}