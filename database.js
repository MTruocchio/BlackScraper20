var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE Pesquisa (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            url text UNIQUE, 
            site text, 
            selector text,
            target integer,
            CONSTRAINT url_unique UNIQUE (url)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO Pesquisa (title, url, site, selector, target) VALUES (?,?,?,?,?)'
                db.run(insert, ["Ryzen 5 3600","https://www.kabum.com.br/produto/102438/processador-amd-ryzen-5-3600-cache-32mb-3-6ghz-4-2-","Kabum","span.preco_desconto_avista-cm", 799])
                console.log('Primeira pesquisa cadastrada.')
               
            }
        });  
    }
});


module.exports = db