const express  = require("express");
const router = express.Router();

module.exports =(db)=> {

    router.get('/', (req, res) => {
        console.log('\x1b[45m', "detected /products query");

        db.all("SELECT * FROM products", (err, rows) => {
            if (err) {
                console.log('\x1b[31m', err.message);
            }
            res.json({
                status: "ok",
                data: {
                    products: rows,
                }
            });
        });
    });

    router.get('/:id', (req, res) => {

        const {params: {id}} = req;

        if (Number.isInteger(parseInt(id)) && parseInt(id) > 0) {
            db.get(`SELECT * FROM products WHERE id = ${id}`, (err, row) => {
                if (err) {
                    console.log('\x1b[31m', err.message);
                }

                console.log(row);

                res.json({
                    status: "ok",
                    data: {
                        products: row,
                    }
                });
            });
        } else {
            res.json({
                status: "404",
                error: {
                    message: "Products not found. Not correct ID",
                }
            });
        }
    });

    router.put('/:id', (req, res) => {
        const {params: {id}} = req;
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

    router.delete('/:id', (req, res) => {
        const {params: {id}} = req;

        const query = `DELETE FROM products WHERE id = ${id}`;
        db.run(query, (err, data) => {
            if (err) {
                console.log('\x1b[31m', err.message);
            }

            res.json({
                status: "delete",
            });
        });
    });

    router.post('/', (req, res) => {
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
   return router;
};

