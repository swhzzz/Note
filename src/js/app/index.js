require('scss/index.scss')
var NoteManager = require('module/note-manager')

$('.add').on('click', () => {
    NoteManager.add()
});
NoteManager.load();
