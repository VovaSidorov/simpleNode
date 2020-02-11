const products  =  [
    {
        "id": 1,
        "price": 120.36,
        "title": "Nike super sport 123",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "image": "images/shoes01.jpg"
    },
    {
        "id": 2,
        "price": 205.55,
        "title": "Reebok sport R3",
        "description": "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.",
        "image": "images/shoes02.jpg"
    },
    {
        "id": 3,
        "price": 99.99,
        "title": "Reebok Racer",
        "description": "The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software.",
        "image": "images/shoes03.jpg"
    },
    {
        "id": 4,
        "price": 199.99,
        "title": "Reebok meant QSR",
        "description": "Richard McClintock, a Latin scholar from Hampden-Sydney College, is credited with discovering the source behind the ubiquitous filler text. In seeing a sample of lorem ipsum, his interest was piqued by consectetur—a genuine, albeit rare, Latin word",
        "image": "images/shoes04.jpg"
    },
    {
        "id": 5,
        "price": 300.99,
        "title": "Sneakers passage WE",
        "description": "Consulting a Latin dictionary led McClintock to a passage from De Finibus Bonorum et Malorum (“On the Extremes of Good and Evil”), a first-century B.C. text from the Roman philosopher Cicero.",
        "image": "images/shoes05.jpg"
    }
    ];

const express  = require("express");
const app = express();

const sqlite = require('sqlite3').verbose();
const path = require("path");

const dbPAth= path.resolve(__dirname,'database/store.sqlite');
const db = new sqlite.Database(dbPAth,(err)=>{
    if(err){
        console.log(err.message)
    }
    console.log("App was connected to db...")
});


app.get("/",(req,res)=>{
    res.send("Shoes shop");
});
app.get("/products",(req,res)=>{
    res.json({
        status:"ok",
        data:{
            products
        }
    });
});

app.get("/products/:id",(req,res)=>{

    const {params:{id}}=req;
   if(Number.isInteger(parseInt(id))&&parseInt(id)>0&&products[id]){
       res.json({
           status:"ok",
           data:{
               products:products[id-1]
           }
       });
   }else{
       res.json({
           status:"40",
           data:{
               message:"Product not found, not correct ID"
           }
       });
   }
});
app.post("/products",(req,res)=>{
    res.send("POST shop");
});

app.listen(3000, err=>{
    if(err){
        console.log("Error...");
    }
    console.log("App wa started...");
});