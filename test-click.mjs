import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  await page.goto('http://localhost:5173/do', { waitUntil: 'networkidle0' });
  
  // click first photo
  await page.evaluate(() => {
    const btn = document.querySelector('.cursor-trigger-zoom');
    if (btn) {
      console.log('Button found, clicking!');
      btn.click();
    } else {
      console.log('Button NOT found');
    }
  });

  await new Promise(r => setTimeout(r, 1000));
  
  // check if lightbox is open
  const hasLightbox = await page.evaluate(() => {
    return !!document.querySelector('.cursor-trigger-close');
  });
  console.log('Lightbox open:', hasLightbox);
  
  await browser.close();
})();
