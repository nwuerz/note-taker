const express = require("express");
const path = require("path");
const fs = require("fs");


const app = express();
const PORT = process.env.PORT || 3000;

// (are these neccessary?)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join('public')))

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

//routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});
//(working?)


//api routes (not working)

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    
    })
});

app.get("*", (req, res) => {
    res.redirect('/')
});

let id = 1;

app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        const currentNotes = JSON.parse(data);
        req.body.id = id;
        id++;
        console.log(req.body, id)
        currentNotes.push(req.body);
        const dataToSave = JSON.stringify(currentNotes);
        fs.writeFile("./db/db.json", dataToSave, (err) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    })
});