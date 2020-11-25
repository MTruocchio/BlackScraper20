var express = require("express")
var app = express()
var bodyParser = require('body-parser')
const socketIo = require("socket.io");
var db = require("./database.js")
var cors = require('cors')


var HTTP_PORT = 8000 
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/api/pesquisas", (req, res, next) => {
    var sql = "select * from Pesquisa"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/api/pesquisas/", (req, res, next) => {
    var errors=[]
    if (!req.body.url){
        errors.push("No url specified");
    }
    if (!req.body.selector){
        errors.push("No selector specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        title: req.body.title,
        url: req.body.url,
        site: req.body.site,
        selector: req.body.selector,
        target: req.body.target        
    }
    var sql ='INSERT INTO Pesquisa (title, url, site, selector, target) VALUES (?,?,?,?,?)'
    var params =[data.title, data.url, data.site, data.selector, data.target]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.delete("/api/pesquisas/:id", (req, res, next) => {
    db.run(
        'DELETE FROM Pesquisa WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
