const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json");
const uniqid = require("uniqid");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

//get to read db.json file

app.get("/api/notes",function(req,res){
const data = getNotes();
res.send(data); 
});

//post a new notes

app.post("/api/notes", function(req, res) {

    const uniq_id = uniqid();
    const addNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniq_id,
    };
    db.push(addNote);
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(db), function (err) {
        if (err) throw err;
    });
    res.send(addNote); 
});

//Delete the entry from the Notes

app.delete("/api/notes/:id", function (req,res) {
    const notes_Id = req.params.id;
    const index = db.findIndex(el => el.id == notes_Id);
    db.splice(index, 1);
    
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(db), function (err) {
        if (err) throw err;
    });
    res.json(db);
});

// HTML routes created for index and notes

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/notes.html"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"))
});

//function to read the db.json file using readFileSync

getNotes = () => {
    const dataBuffer = fs.readFileSync(path.join(__dirname, 'db', 'db.json'))
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  }

app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
})