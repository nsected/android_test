const wdio = require("webdriverio");
const opts = require("./caps.json");
const assert = require('assert');
const process = require('process');

async function main () {
    try {

        async function sleep(msec) {
            return new Promise(resolve => setTimeout(resolve, msec));
        }
        const client = await wdio.remote(opts);
        const id = function (resourceId) {
            return `android=new UiSelector().resourceId("${resourceId}")`
        };
        const textContains = function (text) {
            return `android=new UiSelector().textContains("${text}")`
        };

        const buttonBegin = await client.$(id('ru.mysmartflat.newcity:id/buttonBegin'));
        await buttonBegin.click();
        const button_skip = await client.$(id('ru.mysmartflat.newcity:id/button_skip'));
        await button_skip.click();
        const searchCityTitle = await client.$(id("ru.mysmartflat.newcity:id/textTitle"));
        const searchCityTitleText = await searchCityTitle.getText();
        assert.equal(searchCityTitleText, "Обнинск");
        let headerUserButton = await client.$(id('ru.mysmartflat.newcity:id/imageLeft'));
        await headerUserButton.click();
        const loginInput = await client.$(id('ru.mysmartflat.newcity:id/editText_login_ID'));
        await loginInput.addValue('89194771319');
        const loginPassword = await client.$(id('ru.mysmartflat.newcity:id/editText_password_ID'));
        await loginPassword.addValue('kifavace');
        const loginButton = await client.$(id('ru.mysmartflat.newcity:id/buttonEnter'));
        await loginButton.click();
        await client.setTimeouts(10000);
        await sleep(10000);
        const apartmentButton = await client.$$(id('ru.mysmartflat.newcity:id/button'));
        await console.log(apartmentButton);
        await apartmentButton[0].click();
        const navigation_security = await client.$(id('ru.mysmartflat.newcity:id/navigation_security'));
        await navigation_security.click();
        headerUserButton = await client.$(id('ru.mysmartflat.newcity:id/imageLeft'));
        await headerUserButton.click();
        const userInfoSubtitle = await client.$(id('ru.mysmartflat.newcity:id/tvSubtitle'));
        const userInfoSubtitleText = await userInfoSubtitle.getText();
        await userInfoSubtitleText.includes('кв 173');

        await client.deleteSession();
    }catch (e) {
        console.error(e);
        process.exit(1);
    }
}
main();
