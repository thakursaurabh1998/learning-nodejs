const fs = require("fs");

let originalNote = {
  title: "Some Title",
  body: "Some Body"
};

const originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync("notes.json", originalNoteString);

var noteString = fs.readFileSync("notes.json");
const noteObject = JSON.parse(noteString);