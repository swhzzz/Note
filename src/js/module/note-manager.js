import Note from './note'
import WaterFall from 'module/waterfall'

let NoteManager =(function(){
    function add(){
        Note.init()
        WaterFall.init($('main'))
    }
    return {
        add: add
    }
})()



 module.exports= NoteManager