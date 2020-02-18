let products  =  [];

const express  = require("express");
const app = express();

const sqlite = require('sqlite3').verbose();
const path = require("path");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


const dBPath = path.resolve(__dirname, 'database/store.sqlite');

const db = new sqlite.Database(dBPath, (err) => {
    if(err){
        console.log('\x1b[31m', err.message);
    }
    console.log('\x1b[36m%s\x1b[0m', 'App was connected to DB');
});



app.get('/', (req, res) => {
    res.send("Shoes shop\n");
});

app.get('/products', (req, res) => {
    console.log('\x1b[45m',"detected /products query");

    db.all("SELECT * FROM products", (err, rows) => {
        if (err) {
            console.log('\x1b[31m', err.message);
        }
        res.json({
            status: "ok",
            data:{
                products: rows,
            }
        });
    });
});

app.get('/products/:id', (req, res) => {

    const {params : {id}} = req;

    if( Number.isInteger(parseInt(id)) && parseInt(id) > 0){
        db.get(`SELECT * FROM products WHERE id = ${id}`,(err, row) => {
            if (err) {
                console.log('\x1b[31m', err.message);
            }

            console.log(row);

            res.json({
                status: "ok",
                data:{
                    products: row,
                }
            });
        });
    }else {
        res.json({
            status: "404",
            error:{
                message: "Products not found. Not correct ID",
            }
        });
    }
});

app.put('/products/:id', (req, res) => {
    const {params : {id}} = req;
    console.log(req.body);

    let reqArray = [];
    const {body} = req;
    for (let prop in body) {
        reqArray.push(`${prop} = '${body[prop]}'`)
    }

    console.log(reqArray.join(", "));

    const query = `UPDATE products SET ${reqArray.join(", ")} WHERE id = ${id};`;
    db.run(query, (err, data) => {
        if (err) {
            console.log('\x1b[31m', err.message);
        }

        res.json({
            status: "updated",
        });
    });
});

app.post('/products', (req, res) => {
    console.log(req.body);

    const {price, title, description, image, amount} = req.body;

    const query = `INSERT INTO products(price,title,description,image,amount) VALUES('${price}', '${title}', '${description}', '${image}', '${amount}')`;
    db.run(query, (err, data) => {
        if (err) {
            console.log('\x1b[31m', err.message);
        }
        console.log('\x1b[36m%s\x1b[0m', data);
    });

    res.send("Done\n");
});


app.listen(3000, err => {
    if(err){
        console.log('\x1b[31m', 'Error...');
    }
    console.log('\x1b[36m%s\x1b[0m', 'App was started... on 3000 port');
});
