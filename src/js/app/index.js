require('scss/index.scss')
const NoteManager = require('module/note-manager')

$('.add').on('click', () => {
    NoteManager.add()
});
NoteManager.load();
