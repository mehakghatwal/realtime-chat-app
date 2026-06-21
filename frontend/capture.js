import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });

  // 1. Capture Login Screenshot
  console.log('Navigating to frontend...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'chat_login_real.png' });
  console.log('Captured login page');

  // Try to login if possible. The chat app might have a simple login or need signup.
  // Assuming username and password input. Let's look for standard input fields.
  try {
    await page.type('input[type="text"], input[name="username"]', 'Mehak');
    await page.type('input[type="password"]', 'password');
    await page.click('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")');
    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(e => console.log('Navigation timeout'));
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'chat_dashboard_real.png' });
    console.log('Captured dashboard page');
  } catch (e) {
    console.log('Could not automate login, saving current state as dashboard');
    await page.screenshot({ path: 'chat_dashboard_real.png' });
  }

  await browser.close();

  // For backend API screenshot, we can just use curl and format it or hit an API endpoint with puppeteer
  const apiBrowser = await puppeteer.launch({ headless: 'new' });
  const apiPage = await apiBrowser.newPage();
  await apiPage.setViewport({ width: 800, height: 600 });
  await apiPage.goto('http://localhost:8080', { waitUntil: 'networkidle0' }).catch(e => console.log('API error'));
  await apiPage.screenshot({ path: 'chat_api_real.png' });
  console.log('Captured backend API');
  await apiBrowser.close();

})();
