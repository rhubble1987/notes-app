//Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

//App set up
const app = express();
const PORT = 3000;

//Handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Get notes page
app.get('/notes',function(req,res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

//Get main page
app.get('*',function(req,res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

//Get existing notes
app.get("/api/notes", function(req,res) {
    res.sendFile(path.join(__dirname, "db.json"));
});

//Save new notes
app.post("/api/notes", function(req,res) {
    const newNote = req.body;
    
    fs.writeFile("./db/db.json", newNote, (err) => {
        if (err) throw err;
        console.log('File saved');
    });

    res.sendFile(path.join(__dirname, "db.json"));
});

//Delete saved note
app.get("/api/notes/:id", function(req,res) {
    const noteToDelete = req.params.id;

    const savedNotes = fs.readFile("./db/db.json", (err,data) => {
        if (err) throw (err);
        return data;
    });

    let updatedNotes;

        for (i = 0; i < savedNotes.length; i++) {
            if (noteToDelete == savedNotes[i].id) {
               updatedNotes = savedNotes.splice([i],1);
            }
        }
    fs.writeFile("./db/db.json", updatedNotes, (err) => {
        if (err) throw err;
        console.log(`Note ${noteToDelete} has been deleted.`);
    });

    res.sendFile(path.join(__dirname, "db.json"));
});

//Start server
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}.`);
});