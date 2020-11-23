const robo = require('./robo/')
const parameters = {
  url:"https://www.kabum.com.br/cgi-local/site/produtos/descricao_ofertas.cgi?codigo=99683",
  selector: "span.preco_desconto_avista-cm",
  title: "Ryzen 5 3600",
  site: "Kabum"
}


robo(parameters)