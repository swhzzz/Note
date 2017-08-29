require('scss/index.scss')
var NoteManager = require('module/note-manager')

NoteManager.load();

$('.add').on('click', () => {
    NoteManager.add()
});


