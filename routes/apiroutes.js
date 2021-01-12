const fs = require('fs');


module.exports = function(app) {
    //Get notes
    app.get("/api/notes", function(req,res) {
        fs.readFile("./db/db.json", "utf8", (err,data) => {
            if (err) {
                return console.log(err);
            } else {
                const notes = JSON.parse(data);
                return res.json(notes);
            }
        });
        
        
    });

    //Save new note
    app.post("/api/notes", function(req,res) {
        
        fs.readFile("./db/db.json", "utf8", (err,data) => {
            if (err) {
                console.log(err);
            } else {
                let newNote = req.body;
                let savedNotes = JSON.parse(data);
                if (savedNotes === null) {
                    newNote.id = 1;
                    savedNotes.push(newNote);
                    const filteredSavedNotes = savedNotes.filter(function(item) {
                        return item != null;
                    });
                    console.log(filteredSavedNotes);
                    fs.writeFile('./db/db.json', JSON.stringify(filteredSavedNotes), (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            return res.json('New note saved.');
                        }
                    });

                } else {
                    newNote.id = savedNotes.length + 1;
                    savedNotes.push(newNote);
                    const filteredSavedNotes = savedNotes.filter(function(item) {
                        return item != null;
                    });
                    console.log(filteredSavedNotes);

                    fs.writeFile('./db/db.json', JSON.stringify(filteredSavedNotes), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.sendStatus(200);
                    }
                });
            }
                

            }
        });
        

    });

    //Delete note
    app.delete("/api/notes/:id", function(req,res) {
        fs.readFile("./db/db.json", "utf8", (err,data) => {
            if (err) {
                console.log(err);
            } else {
                let savedNotes = JSON.parse(data);
                const noteToDelete = req.params.id;
                for (i = 0; i < savedNotes.length; i++) {
                if (noteToDelete == savedNotes[i].id) {
                savedNotes.splice([i],1);
                }
                }
                const filteredSavedNotes = savedNotes.filter(function(item) {
                    return item != null;
                });
                console.log(filteredSavedNotes);
                fs.writeFile('./db/db.json', JSON.stringify(filteredSavedNotes), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.sendStatus(200);
                    }
                });
            }
        });
    });
};

