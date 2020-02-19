const express = require('express');
const app = express();


// const sqlite = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const Sequelize = require('sequelize');
const sequelize = new Sequelize('store', 'root', '123465root', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// const dBPath = path.resolve(__dirname, 'database/store.sqlite');
//
// const db = new sqlite.Database(dBPath, (err) => {
//     if(err){
//         console.log('\x1b[31m', err.message);
//     }
//     console.log('\x1b[36m%s\x1b[0m', 'App was connected to DB');
// });

app.get('/', (req, res) => {
    res.send("Shoes shop\n");
});

// const products = require('./routes/products')(db);
// app.use('/products', products);

app.listen(3000, err => {
    if(err){
        console.log('\x1b[31m', 'Error...');
    }
    console.log('\x1b[36m%s\x1b[0m', 'App was started... on 3000 port');
});
