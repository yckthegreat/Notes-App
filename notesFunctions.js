"use strict";

const fs = require("fs"); //Node core module to interact with file system
const chalk = require("chalk");

// List all notes
const getNotes = () => {
  try {
    const existingDataBuffer = fs.readFileSync("./notes.json");
    const existingDataJson = existingDataBuffer.toString();
    const existingDataObj = JSON.parse(existingDataJson);

    return existingDataObj;
  } catch (e) {
    console.log(chalk.red.inverse("You have no notes yet."));
  }
};

// Add new note
const addNote = (title, body) => {
  //New note object
  const newNoteObject = {
    title: title,
    body: body,
  };

  const notes = loadNotes();

  notes.push(newNoteObject);
  saveNotes(notes);

  console.log(chalk.green.inverse("Note added successfully."));
};

// Remove note
const removeNote = (id) => {
  const realId = id - 1;
  const notes = loadNotes();

  if (notes.length === 0) {
    console.log(chalk.red.inverse("No notes found."));
    return;
  }

  // The splice() method changes the contents of an array by removing existing elements and/or adding new elements.
  notes.splice(realId, 1);

  saveNotes(notes);

  console.log(chalk.green.inverse("Note removed successfully."));
};

// Read note
const readNote = (id) => {
  const realId = id - 1;
  const notes = loadNotes();

  if (notes.length === 0) {
    console.log(chalk.red.inverse("No notes found."));
    return;
  }

  const noteToRead = notes[realId];

  console.log(chalk.green.bold(`Title: ${noteToRead.title}`));
  console.log(`Body: ${noteToRead.body}`);
};

// Save notes helper
const saveNotes = (notesArr) => {
  const notesJson = JSON.stringify(notesArr);
  fs.writeFileSync("./notes.json", notesJson);
};

// Load notes helper
const loadNotes = () => {
  try {
    const existingDataBuffer = fs.readFileSync("./notes.json");
    const existingDataJson = existingDataBuffer.toString();
    const existingDataObj = JSON.parse(existingDataJson);

    return existingDataObj;
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote,
};
