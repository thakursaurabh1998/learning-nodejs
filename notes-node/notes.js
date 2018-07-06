const fs = require("fs");
const _ = require('lodash');

const writeJSON = notes => {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

const parseJSON = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.json"));
  } catch (error) {
    return [];
  }
};

let notes = parseJSON();

const addNote = (title, body) => {
  var duplicate = notes.filter(note => note.title === title);
  if (duplicate.length === 0) {
    notes.push({ title, body });
    writeJSON(notes);
    return { title, body }
  } else {
    return undefined;
  }
};

const getAll = () => parseJSON();

const removeNote = title => {
  const obj = _.find(notes, {title});
  notes.splice(notes.indexOf(obj),1);
  writeJSON(notes);
  return obj;
}

const getNote = title =>  _.find(notes,{ title });

module.exports = {
  addNote,
  getAll,
  removeNote,
  getNote
};
