import puppeteer from "puppeteer";

const requestPdfService = async (transferId: string, accountid: string) => {
  const browser = puppeteer.launch();
  const page = await (await browser).newPage();

  await (
    await page
  ).goto(
    `http://localhost:3000/transfer/pdf/generate/${transferId}/${accountid}`
  );

  const pdf = await page.pdf({
    printBackground: true,
    format: "Letter",
  });

  await (await browser).close();

  return pdf;
};

export default requestPdfService;
