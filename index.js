import puppeteer from "puppeteer";
import { config } from "dotenv";
config();

(async () => {
  const browser = await puppeteer.launch({
    slowMo: 50,
    // headless: false,
    defaultViewport: null,
    protocolTimeout: 6e4,
    args: ["--no-sandbox", "--start-maximized"],
    // userDataDir: "./.pupp",
    // executablePath: "/usr/bin/chromium",
  });

  const context = browser.defaultBrowserContext();
  await context.overridePermissions("https://tlconnect.teamlease.com", [
    "background-sync",
    "persistent-storage",
  ]);

  const page = await browser.newPage();

  await page.goto("https://tlconnect.teamlease.com/", {
    waitUntil: "load",
    timeout: 6e4,
  });

  await page.waitForSelector("#txtuserid");
  await page.type("#txtuserid", process.env.USERID);

  await page.waitForSelector("#txtpassword");
  await page.type("#txtpassword", process.env.PASSWORD);

  await page.waitForSelector("#btnsubmit");
  await page.click("#btnsubmit");

  await page.waitForNavigation({ waitUntil: "load", timeout: 6e4 });

  // await page.waitForSelector("#btnchkin");
  // await page.click("#btnchkin");
  await page.waitForFunction(
    (selector) => {
      const btn = document.querySelector(selector);
      // console.log(btn?.ariaDisabled, btn?.disabled, btn?.checkVisibility());
      if (btn && btn.checkVisibility()) {
        btn.click();
        return true;
      }
    },
    { polling: "raf" },
    "#btnchkin"
  );

  await page.waitForSelector("button.confirm");
  await page.click("button.confirm");

  await page.close();
  await browser.close();
})().catch(console.log);
