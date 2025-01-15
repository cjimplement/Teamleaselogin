import puppeteer from "puppeteer-core";
import { config } from "dotenv";
config();

(async () => {
  const browser = await puppeteer.launch({
    // slowMo: 50,
    headless: false,
    defaultViewport: null,
    protocolTimeout: 0,
    args: ["--start-maximized"],
    // userDataDir: "./.pupp",
    executablePath:
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  });

  const context = browser.defaultBrowserContext();
  await context.overridePermissions("https://tlconnect.teamlease.com", [
    "background-sync",
    "persistent-storage",
  ]);
  const page = await browser.newPage();

  await page.goto("https://tlconnect.teamlease.com/", {
    waitUntil: "load",
    timeout: 0,
  });

  await page.waitForSelector("#txtuserid");
  await page.type("#txtuserid", process.env.USERNAME);

  await page.waitForSelector("#txtpassword");
  await page.type("#txtpassword", process.env.PASSWORD);

  await page.waitForSelector("#btnsubmit");
  await page.click("#btnsubmit");

  await page.waitForNavigation({ waitUntil: "load", timeout: 0 });

  await page.waitForSelector("#btnchkin");
  await page.click("#btnchkin");

  await page.waitForSelector("button.confirm", { state: "visible" });
  await page.click("button.confirm");
  await browser.close();

  // page.waitForEvent("popup");
  // await page.click("#popup");
  // await browser.close();

  // const uishow = 'a[id^="uifresponsyshamburgerbutton-"]';
  // await page.waitForSelector(uishow);
  // await page.$eval(uishow, (el) => el.click());

  // const folder =
  //   'li.x-treelist-item.x-treelist-item-leaf.x-treelist-item-with-icon[id^="ext-customtreelistitem-"] > div.x-treelist-row[id^="ext-element-"] > div.x-treelist-item-wrap[id^="ext-element-"] > div.x-treelist-item-text[id^="ext-element-"]';

  // await page.$$eval(folder, (els) => {
  //   for (const el of els)
  //     if (el.textContent.trim().toLowerCase() === "folders") el.click();
  //   return true;
  // });

  // After forder clicked: Start here:
})();
//  https://be98hd.responsys.ocs.oraclecloud.com/suite/c#!home
