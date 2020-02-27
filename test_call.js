const wdio = require("webdriverio");
const opts = require("./caps.json");
const assert = require('assert');
const process = require('process');
const https = require('https');
const QrCode = require('qrcode-reader');
const qr = new QrCode();
const Jimp = require("jimp");
const fs = require('fs');

async function main () {
    try {
        async function sleep(msec) {
            return new Promise(resolve => setTimeout(resolve, msec));
        }
        const id = function (resourceId) {
            return `android=new UiSelector().resourceId("${resourceId}")`
        };
        const textContains = function (text) {
            return `android=new UiSelector().textContains("${text}")`
        };
        async function callIntercom() {
            https.get('https://api-product.mysmartflat.ru/api/script3/call-from-intercom/?from=3237&to=38276', (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', (chunk) => {
                    data += chunk;
                    console.log(data);
                    if (data.error>0){
                        throw new Error('error while call')
                    }
                });
            }).on("error", (err) => {
                err.name = 'error while call';
                throw err

            });
        }
        const client = await wdio.remote(opts);

        const buttonBegin = await client.$(id('ru.mysmartflat.newcity:id/buttonBegin'));
        await buttonBegin.click();
        const button_skip = await client.$(id('ru.mysmartflat.newcity:id/button_skip'));
        await button_skip.click();
        let headerUserButton = await client.$(id('ru.mysmartflat.newcity:id/imageLeft'));
        await headerUserButton.click();
        const loginInput = await client.$(id('ru.mysmartflat.newcity:id/editText_login_ID'));
        await loginInput.addValue('test_phone@crm.mysmartflat.ru');
        const loginPassword = await client.$(id('ru.mysmartflat.newcity:id/editText_password_ID'));
        await loginPassword.addValue('test_phone');
        const loginButton = await client.$(id('ru.mysmartflat.newcity:id/buttonEnter'));
        await loginButton.click();
        await sleep(30000);
        await callIntercom();

        const mjpeg = await client.$(id('ru.mysmartflat.newcity:id/mjpeg'));
        await mjpeg.waitForExist(50000);
        await sleep(10000);
        await client.saveScreenshot('./image.png');

        const answer = await client.$(id('ru.mysmartflat.newcity:id/answer'));
        // await answer.waitForExist(5000);
        await answer.click();
        const discard = await client.$(id('ru.mysmartflat.newcity:id/discard'));
        // await discard.waitForExist(5000);
        await discard.click();


    }catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main();
