"use strict";

const notesFunctions = require("./notesFunctions.js");
const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");

// Show all notes command
yargs.command({
  command: "all",
  description: "Get all notes.",
  handler() {
    console.log(chalk.gray("Getting all notes...\n"));
    const allNotes = notesFunctions.getNotes();

    console.log(`You have ${allNotes.length} notes!\n`);

    allNotes.forEach((element, index) => {
      console.log(chalk.blue(`ID: ${index + 1}`));
      console.log(`Title: ${element.title}`);
      console.log(`Body: ${element.body}`);
      console.log("");
    });
  },
});

// Add new note command
yargs.command({
  command: "add",
  description: "Add a new note.",
  builder: {
    title: {
      describe: "Note title.",
      type: "string",
      demandOption: true,
    },
    body: {
      describe: "Note title.",
      type: "string",
      demandOption: true,
    },
  },
  handler(argv) {
    console.log(chalk.gray("Adding a new note..."));

    const title = argv.title;
    const body = argv.body;

    console.log(`Title: ${title}`);
    console.log(`Body: ${body}`);

    notesFunctions.addNote(title, body);
  },
});

// Remove note command
yargs.command({
  command: "remove",
  description: "Remove note.",
  builder: {
    id: {
      describe: "Note ID.",
      type: "number",
      demandOption: true,
    },
  },
  handler(argv) {
    console.log(chalk.gray("Removing note..."));

    const id = argv.id;
    notesFunctions.removeNote(id);
  },
});

// Read note command
yargs.command({
  command: "read",
  description: "Read note.",
  builder: {
    id: {
      describe: "Note ID.",
      type: "number",
      demandOption: true,
    },
  },
  handler(argv) {
    console.log(chalk.gray("Getting note..."));

    const id = argv.id;
    notesFunctions.readNote(id);
  },
});

yargs.parse();
