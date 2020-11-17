const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = 8080;


//HTML routes created

app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname + "/public/notes.html"))
})

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname + "/public/index.html"))
})

//API routes to be created

app.get("/api/notes",function(req,res){
    res.json()
})


//Start the App

app.listen(PORT,function(){
    console.log("App listening on PORT"+PORT);
})