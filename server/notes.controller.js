const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green('Note added'));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.white('List of notes:'));
  notes.forEach((note) => {
    console.log(chalk.yellow(note.id), chalk.blue(note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const noteInd = notes.indexOf(notes.find((n) => n.id === id));
  if (noteInd === -1) {
    console.log(chalk.yellow("Note with this id wasn't found"));
  } else {
    if (notes.length === 1) {
      notes.length = 0;
    } else {
    notes.splice(noteInd, 1);
    }
    console.log(chalk.red(`Note with id ${id} was deleted`));
  }
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function editNote(id, newTitle) {
  const notes = await getNotes();
  const noteInd = notes.findIndex((n) => n.id === id);
  console.log(notes);
  notes[noteInd].title = newTitle;
  console.log(notes);
  console.log(chalk.yellow(`Note id ${id} title has been changed`));
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
  addNote,
  getNotes,
  printNotes,
  removeNote,
  editNote,
};
