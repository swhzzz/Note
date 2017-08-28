var Note =require('./note')
var WaterFall = require('module/waterfall')

var NoteManager = (function () {
    function add() {
        Note.init();
        WaterFall.init($('main'))
    }

    function load() {
        $.get('/api/fetch').then((data) => {//页面加载时，发请求，拿数据，遍历渲染，布局
            // console.log(data)
            for (var i = 0; i < data.length; i++) {
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