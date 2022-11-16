const { chromium } = require('playwright');
const expect = require('expect')

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const targetUrl = process.env.ENVIRONMENT_URL || 'https://app.finta.io';
  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  await page.waitForSelector('.page'); 
  
  expect(page.url()).toBe(targetUrl +'/login')

  await browser.close();
}

run();