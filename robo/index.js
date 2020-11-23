const puppeteer = require('puppeteer');
const robo = async (props) => {
    const browser = await puppeteer.launch({headless: true});
      const page = await browser.newPage();
      await page.goto(props.url);
      var getSelector = () => props.selector
      await page.exposeFunction('getSelector', getSelector)
    
      const resultado = await page.evaluate(async () => {
        var selec = await getSelector()
        return {
            valor: document.querySelector(selec).innerHTML 
        };
      });
    
      console.log(`o valor de ${props.title} em ${props.site} é:  ${resultado.valor}`)
    
      await browser.close();
    
    }  
module.exports = robo