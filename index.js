require('dotenv');
const puppeteer = require('puppeteer-core');
const express = require('express');
const cors = require('cors');
const path = require('path');

const {PORT} = process.env;

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'google-chrome',
    args: ['--no-sandbox'],
  });
  const [page] = await browser.pages();
  await page.goto('https://www.youtube.com/playlist?list=UUyiaHuXSb9swpj9uIo8C5Ww&playnext=1&index=1');
  await page.click('[class="ytp-play-button ytp-button ytp-play-button-playlist"]');
  setInterval(() => {
    page.screenshot({path: './screenshot.png'});
  }, 3000);
})()

const app = express();

app.use(cors());
app.get('/screenshot', (req, res) => {
  res.sendFile(path.resolve('screenshot.png'));
});

app.listen(PORT || 8080, () => {
  console.log('Server running on port ' + (PORT || 8080));
});
