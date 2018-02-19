const puppeteer = require('puppeteer');

async function scrpProfile(link) {
  const browser = await puppeteer.launch({timeout:0, headless:false});
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.resourceType === 'image' || request.resourceType === 'stylesheet')
      request.abort();
    else
      request.continue();
  });
  await page.goto('https://linkedin.com');
  await page.waitFor('input[id=login-email]');
  await page.type('input[id=login-email]', 'juanitogusanito21@gmail.com');
  await page.type('input[id=login-password]', 'juanito123');
  await page.click('input[id=login-submit]');
  await page.waitForSelector('.lazy-image');
  await page.waitForSelector('.sharing-create-share-view__create-content');
  await page.waitForSelector('.nav-search-bar');
  await page.goto(link);
  await page.waitForSelector('.authentication-outlet');
  page.waitForNavigation({waitUntil:'domcontentloaded'});
    await page.waitForSelector('.pv-top-card-section__location');
    await page.waitForSelector('.pv-top-card-section__name');
    await page.waitForSelector('.pv-top-card-section__headline');
    await page.waitForSelector('.pv-top-card-section__image');
    const userInformation = await page.evaluate(() => {
        const user = {
            location : Array.from(document.querySelectorAll('.pv-top-card-section__location'))[0].textContent,
            name : Array.from(document.querySelectorAll('.pv-top-card-section__name'))[0].textContent,
            title : Array.from(document.querySelectorAll('.pv-top-card-section__headline'))[0].textContent,
            picture : Array.from(document.querySelectorAll('.pv-top-card-section__image'))[0].src,
        }
        return user;
    });
    return userInformation;
    await browser.close();        
 };
module.exports = { scrpProfile };