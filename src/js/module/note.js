import 'scss/note.scss'
import WaterFall from 'module/waterfall'

let Note = (function () {
    function _Note() {
        this.msg = '在这里输入内容';
        this.createNode();
        this.bindEvent();
    }

    _Note.prototype.createNode = function () {
        let tpl = `<div class="note">
               <div class="note-head"></div>
               <div class="close">x</div>
               <div class="note-content" contenteditable="true">${this.msg}</div> 
            </div>`;
        this.$note = $(tpl);
        this.$noteHead = this.$note.find('.note-head');
        this.$noteContent = this.$note.find('.note-content');
        $('main').append(this.$note);
    };


    _Note.prototype.bindEvent = function () {
        this.$noteContent.on('focus', () => { //focus删除内容
            if (this.$noteContent.html() === this.msg)
                this.$noteContent.html('')
        });

        this.$noteHead.on('mousedown', (e) => {
            let evtX = e.pageX - this.$note.offset().left;//获取当前鼠标距离左侧边框的距离
            let evtY = e.pageY - this.$note.offset().top;
            this.$note.addClass('draggable').data('evtPos', {'x': evtX, 'y': evtY})//保存数据到data中
        }).on('mouseup', () => {
            this.$note.removeClass('draggable')
        });

        this.$note.on('mouseover', () => {
            this.$note.find('.close').fadeIn()
        });

        this.$note.on('mouseleave', () => {
            this.$note.find('.close').fadeOut()
        });

        this.$note.find('.close').on('click', () => {
            this.$note.remove()
            WaterFall.init($('main'))
        });

        $('body').on('mousemove', (e) => {//这里的body高度要设置为100%，否则拖动到body外面，事件不能监听
            if ($('.draggable').length > 0) {
                $('.draggable').offset({
                    top: e.pageY - $('.draggable').data('evtPos').y,
                    left: e.pageX - $('.draggable').data('evtPos').x
                })
            }
        })
    };

    return {
        init() {
            new _Note()
        }
    }
})();


module.exports = Note;