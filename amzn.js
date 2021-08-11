const got = require("got");
const HTMLParser = require('node-html-parser');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/875097227146711150/U82NCDS3xTmW34sHiUxZGVb_UtrzOkv5DP7h8i7PqL8KDFr8-Vo04mBop3qKhb-XZLGx");

const ProductLink = "https://www.amazon.co.uk/PlayStation-9395003-5-Console/dp/B08H95Y452/ref=sr_1_1?dchild=1&keywords=PlayStation+5+Console&qid=1628246575&sr=8-1";





async function Monitor() {
    var myheaders = {
        'connection': 'keep-alive',
        'sec-ch-ua': 'Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92',
        'sec-ch-ua-mobile': '?0',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'rtt': 350,
        'ect': '3g',
        'downlink': 1.4
    }

    const response = await got(ProductLink, {
        headers: myheaders
    });

    if (response && response.statusCode == 200) {
        let root = HTMLParser.parse(response.body);
        let availabilityDiv = root.querySelector('#availability');
        if (availabilityDiv) {
            let ProductName = ProductLink.substring(ProductLink.indexOf('uk/') + 3, ProductLink.indexOf('/dp'))
            let stockText = availabilityDiv.childNodes[1].innerText;
            if (stockText == 'In Stock.') {
                console.log(ProductName + ": IN STOCK")
                const embed = new MessageBuilder()
                    .setTitle('Now IN STOCK!')
                    .setAuthor('PlayStation 5 Disc Edition', 'https://techcrunch.com/wp-content/uploads/2020/11/PS5-header.jpg?w=730&crop=1')
                    .setURL('https://www.amazon.co.uk/PlayStation-9395003-5-Console/dp/B08H95Y452/ref=sr_1_1?dchild=1&keywords=PlayStation+5+Console&qid=1628246575&sr=8-1')
                    .addField('Availibility', 'In Stock', true)
                    .setColor('#00b0f4')
                    .setThumbnail('https://techcrunch.com/wp-content/uploads/2020/11/PS5-header.jpg?w=730&crop=1')
                    .setDescription('Good Luck on securing this highly demanded console :)')
                    .setImage('https://techcrunch.com/wp-content/uploads/2020/11/PS5-header.jpg?w=730&crop=1')
                    .setTimestamp();

                    hook.send(embed)
            } else {
                console.log(ProductName + ': Out Of Stock')

            }
        }

        await new Promise(r => setTimeout(r, 1000))
        Monitor();
        return false
    }
}

Monitor()