const puppeteer = require('puppeteer');


const url = "https://www.kabum.com.br/cgi-local/site/produtos/descricao_ofertas.cgi?codigo=99683"
const selector = "span.preco_desconto_avista-cm"
const title = "Ryzen 5 3600"
const site = "Kabum"

const robo = async () => {
const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(url);

  const resultado = await page.evaluate(() => {
    return {
        valor: document.querySelector(`span.preco_desconto_avista-cm`).innerHTML      
    };
  });

  console.log(`o valor de ${title} em ${site} é:  ${resultado.valor}`)

  await browser.close();

}  
robo()