import Toast from 'module/toast'
import 'scss/index.scss'
import NoteManager from 'module/note-manager'
// import WaterFall from 'module/waterfall'

$('.add').on('click', () => {
    NoteManager.add()
});
NoteManager.load();
// Toast.init('success')