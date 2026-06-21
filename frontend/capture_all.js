import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const ASSIGNMENTS_DIR = path.resolve('../assignments');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  // ============ 1. CAPTURE ASSIGNMENT PDF FIRST PAGES ============
  const assignmentPDFs = [
    { pdf: path.join(ASSIGNMENTS_DIR, 'Weekly_Assignment_1.pdf'), out: 'chat_assignment_1_page1.png' },
    { pdf: path.join(ASSIGNMENTS_DIR, 'Weekly_Assignment_2.pdf'), out: 'chat_assignment_2_page1.png' },
    { pdf: path.join(ASSIGNMENTS_DIR, 'Weekly_Assignment_3.pdf'), out: 'chat_assignment_3_page1.png' },
    { pdf: path.join(ASSIGNMENTS_DIR, 'Weekly_Assignment_4.pdf'), out: 'chat_assignment_4_page1.png' },
    { pdf: path.join(ASSIGNMENTS_DIR, 'Weekly_Assignment_5.pdf'), out: 'chat_assignment_5_page1.png' },
  ];

  for (const { pdf, out } of assignmentPDFs) {
    if (!fs.existsSync(pdf)) { console.log(`SKIP: ${pdf} not found`); continue; }
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 1100 });
    const fileUrl = 'file:///' + pdf.replace(/\\/g, '/');
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(ASSIGNMENTS_DIR, out), fullPage: false });
    console.log(`Captured ${out}`);
    await page.close();
  }

  // ============ 2. CAPTURE FRONTEND SCREENSHOTS ============
  
  // 2a. Login Page
  const loginPage = await browser.newPage();
  await loginPage.setViewport({ width: 1280, height: 800 });
  await loginPage.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 10000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 2000));
  await loginPage.screenshot({ path: path.join(ASSIGNMENTS_DIR, 'screenshot_login.png') });
  console.log('Captured screenshot_login.png');

  // 2b. Click "Register" link to see signup form
  try {
    await loginPage.click('a, button, span, p');
  } catch(e) {}
  // Try finding the Register link
  const registerLink = await loginPage.$('text/Register');
  if (registerLink) {
    await registerLink.click();
    await new Promise(r => setTimeout(r, 1500));
    await loginPage.screenshot({ path: path.join(ASSIGNMENTS_DIR, 'screenshot_signup.png') });
    console.log('Captured screenshot_signup.png');
    
    // Go back to login
    const loginLink = await loginPage.$('text/Sign');
    if (loginLink) await loginLink.click();
    await new Promise(r => setTimeout(r, 1000));
  } else {
    // Try finding by text content
    const links = await loginPage.$$('a, span, p, button');
    for (const link of links) {
      const text = await link.evaluate(el => el.textContent);
      if (text && text.includes('Register')) {
        await link.click();
        await new Promise(r => setTimeout(r, 1500));
        await loginPage.screenshot({ path: path.join(ASSIGNMENTS_DIR, 'screenshot_signup.png') });
        console.log('Captured screenshot_signup.png');
        break;
      }
    }
  }

  // 2c. Register a user, then login
  try {
    // Fill signup form
    const inputs = await loginPage.$$('input');
    if (inputs.length >= 3) {
      await inputs[0].click({ clickCount: 3 });
      await inputs[0].type('testuser');
      await inputs[1].click({ clickCount: 3 });
      await inputs[1].type('test@example.com');
      await inputs[2].click({ clickCount: 3 });
      await inputs[2].type('password123');
      
      // Submit
      const submitBtn = await loginPage.$('button[type="submit"]');
      if (submitBtn) await submitBtn.click();
      await new Promise(r => setTimeout(r, 2000));
    }
  } catch(e) { console.log('Signup attempt:', e.message); }

  // Try navigating back to login and logging in
  await loginPage.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 10000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 1500));

  // Check if we need to switch to login mode
  const pageContent = await loginPage.content();
  if (pageContent.includes('Register') && !pageContent.includes('Sign In') && !pageContent.includes('Sign in')) {
    // We might be on register page, click login link
    const allLinks = await loginPage.$$('a, span, p, button');
    for (const link of allLinks) {
      const text = await link.evaluate(el => el.textContent);
      if (text && (text.includes('Sign in') || text.includes('Login') || text.includes('login'))) {
        await link.click();
        await new Promise(r => setTimeout(r, 1000));
        break;
      }
    }
  }

  // Login
  try {
    const loginInputs = await loginPage.$$('input');
    if (loginInputs.length >= 2) {
      await loginInputs[0].click({ clickCount: 3 });
      await loginInputs[0].type('testuser');
      await loginInputs[1].click({ clickCount: 3 });
      await loginInputs[1].type('password123');
      
      const loginBtn = await loginPage.$('button[type="submit"]');
      if (loginBtn) await loginBtn.click();
      await new Promise(r => setTimeout(r, 3000));
      
      // Capture Dashboard
      await loginPage.screenshot({ path: path.join(ASSIGNMENTS_DIR, 'screenshot_dashboard.png') });
      console.log('Captured screenshot_dashboard.png');
    }
  } catch(e) { console.log('Login attempt:', e.message); }

  await loginPage.close();

  // ============ 3. CAPTURE BACKEND API ============
  const apiPage = await browser.newPage();
  await apiPage.setViewport({ width: 1280, height: 800 });
  
  // API /api/rooms
  await apiPage.goto('http://localhost:8080/api/rooms', { waitUntil: 'networkidle0', timeout: 10000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 1500));
  await apiPage.screenshot({ path: path.join(ASSIGNMENTS_DIR, 'screenshot_backend_api.png') });
  console.log('Captured screenshot_backend_api.png');
  await apiPage.close();

  // ============ 4. CAPTURE H2 CONSOLE ============
  const h2Page = await browser.newPage();
  await h2Page.setViewport({ width: 1280, height: 800 });
  await h2Page.goto('http://localhost:8080/h2-console', { waitUntil: 'networkidle0', timeout: 10000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 2000));
  await h2Page.screenshot({ path: path.join(ASSIGNMENTS_DIR, 'screenshot_h2_console.png') });
  console.log('Captured screenshot_h2_console.png');
  await h2Page.close();

  await browser.close();
  console.log('\n=== ALL SCREENSHOTS CAPTURED ===');
})();
