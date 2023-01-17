import puppeteer from "puppeteer";
import "dotenv/config";

const requestPdfService = async (
  transferId: string,
  accountid: number
): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  if (process.env.NODE_ENV === "production") {
    await page.goto(
      `https://finbank-api.onrender.com/transfer/pdf/generate/${transferId}/${accountid}`
    );
  } else {
    await page.goto(
      `http://localhost:3000/transfer/pdf/generate/${transferId}/${accountid}`
    );
  }

  const pdf = await page.pdf({
    printBackground: true,
    format: "Letter",
  });

  await (await browser).close();

  return pdf;
};

export default requestPdfService;
