import puppeteer from "puppeteer-core";
// import { config } from "dotenv";
// config();

(async () => {
  const browser = await puppeteer.launch({
    // slowMo: 50,
    // headless: false,
    defaultViewport: null,
    protocolTimeout: 6e4,
    args: ["--start-maximized"],
    // userDataDir: "./.pupp",
    // executablePath:
    //   "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  });

  const context = browser.defaultBrowserContext();
  await context.overridePermissions("https://tlconnect.teamlease.com", ["background-sync", "persistent-storage"]);

  const page = await browser.newPage();

  await page.goto("https://tlconnect.teamlease.com/", {
    waitUntil: "load",
    timeout: 6e4,
  });

  console.log(process.env.USERNAME, process.env.PASSWORD);

  // await page.waitForSelector("#txtuserid");
  // await page.type("#txtuserid", process.env.USERNAME);

  // await page.waitForSelector("#txtpassword");
  // await page.type("#txtpassword", process.env.PASSWORD);

  // await page.waitForSelector("#btnsubmit");
  // await page.click("#btnsubmit");

  // await page.waitForNavigation({ waitUntil: "load", timeout: 6e4 });

  // await page.waitForSelector("#btnchkin");
  // await page.click("#btnchkin");

  // await page.waitForSelector("button.confirm", { state: "visible" });
  // await page.click("button.confirm");

  await page.close();
  await browser.close();
})();
