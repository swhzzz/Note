import Note from './note'
import WaterFall from 'module/waterfall'

let NoteManager = (function () {
    function add() {
        Note.init();
        WaterFall.init($('main'))
    }

    function load() {
        $.get('/api/xx').then((data) => {//页面加载时，发请求，拿数据，遍历渲染，布局
            for (let i = 0; i < data.length; i++) {
                Note.init(data[i])
            }
            WaterFall.init($('main'))
        })
    }

    return {
        add: add,
        load: load
    }
})();


module.exports = NoteManager;