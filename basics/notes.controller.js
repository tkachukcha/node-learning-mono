const notes = [];

function addNote(title) {
  const note = {
    title,
    id: Date.now().toString()
  }
}

function getNotes() {
  return notes;
}

module.exports = {
  addNote, getNotes
}