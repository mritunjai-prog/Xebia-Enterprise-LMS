const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/admin/categories');
  const categories = await page.evaluate(() => localStorage.getItem('lms_categories_v1'));
  console.log(categories);
  await browser.close();
})();
