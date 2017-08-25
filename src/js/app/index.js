import Note from 'module/note'
import Toast from 'module/toast'
import 'scss/index.scss'
import NoteManager from 'module/note-manager'
// import WaterFall from 'module/waterfall'

// new Toast('fds')
// new Toast('fdss')
// new Toast('fdsds')
$('#add').on('click', () => {
    NoteManager.add()
})
NoteManager.add()