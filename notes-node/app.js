// const os = require('os');
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");

const titleOptions = {
  describe: "Title of note",
  demand: true,
  alias: "t"
};

const bodyOptions = {
  describe: "Body of note",
  demand: true,
  alias: "b"
}

const argv = yargs
  .command("add", "Adds a new note", {
    title: titleOptions,
    body: bodyOptions
  })
  .command("list", "Lists all the notes")
  .command("read", "Read a specfic note", {
    title: titleOptions
  })
  .command("remove", "Remove a note", {
    title: titleOptions
  })
  .help().argv;
// console.log(argv);

const command = argv._[0];

const { title, body } = argv;

let note;

switch (command) {
  case "add":
    note = notes.addNote(title, body);
    if (note === undefined) console.log("Duplicate note exists");
    else console.log("Added note: ", title, body);
    break;
  case "list":
    note = notes.getAll();
    if (note !== undefined)
      note.forEach(n => {
        console.log("\nTitle: " + n.title + "\nBody: " + n.body);
      });
    else console.log("List is empty");
    break;
  case "read":
    note = notes.getNote(title);
    if (note !== undefined)
      console.log("Title: " + note.title + "\nBody: " + note.body);
    else console.log("No note exists with this title");
    break;
  case "remove":
    note = notes.removeNote(title);
    if (note !== undefined)
      console.log(
        "Deleted Note\nTitle: " + note.title + "\nBody: " + note.body
      );
    else console.log("Note not found");
    break;
  default:
    console.log("Command not recognized");
}

// console.log('app.js');
// console.log(_.isString("Saurabh thakur"));
// console.log(_.isString([1,2,3]));
// console.log(_.uniq([1,2,2,1,3,4,6,4,2]));
// fs.appendFileSync('text.txt',`hello ${os.userInfo().username}`);
