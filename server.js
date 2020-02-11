let products  =  [];

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

    db.all("SELECT * FROM products",(err,rows)=>{
        if(err){
            console.log(err.message);
        }
        console.log(rows);
        res.json({
            status:"ok",
            data:{
                products: rows
            }
        });
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