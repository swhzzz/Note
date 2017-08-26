import 'scss/note.scss'
import WaterFall from 'module/waterfall'
import Toast from 'module/toast'

let Note = (function () {
    function _Note(opts) {
        this.data = opts || {id: '', text: '在这里输入内容'};
        this.createNode();
        this.bindEvent();
    }

    _Note.prototype.createNode = function () {
        let tpl = `<div class="note transition">
               <div class="note-head"></div>
               <div class="close">x</div>
               <div class="note-content" contenteditable="true">${this.data.text}</div> 
            </div>`;
        this.$note = $(tpl);
        this.$noteHead = this.$note.find('.note-head');
        this.$noteContent = this.$note.find('.note-content');
        $('main').append(this.$note);
    };

    _Note.prototype.bindEvent = function () {
        this.$noteContent.on('focus', () => { //focus删除内容
            if (this.data.text === '在这里输入内容')
                this.$noteContent.html('')
        });

        this.$noteHead.on('mousedown', (e) => {
            let evtX = e.pageX - this.$note.offset().left;//获取当前鼠标距离左侧边框的距离
            let evtY = e.pageY - this.$note.offset().top;
            this.$note.removeClass('transition').addClass('draggable').data('evtPos', {'x': evtX, 'y': evtY})//保存数据到data中
        }).on('mouseup', () => {
            this.$note.removeClass('draggable').addClass('transition')
        });

        this.$note.on('mouseover', () => {
            this.$note.find('.close').fadeIn()
        }).on('mouseleave', () => {
            this.$note.find('.close').fadeOut()
        });

        this.$noteContent.on('blur', () => {
            let text=this.$noteContent.html();
            this.data.text=text;
            if (text === '') {
                this.$note.remove()
            } else if(this.data.id){//通过id是否存在来判断note是否是新增的
                this.edit()
            } else{
                this.add()
            }
        });

        this.$note.find('.close').on('click', () => {
            this.$note.remove();
            this.delete();
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

    _Note.prototype.add = function () {
        $.post('/api/add', {msg: this.data.text}).then((result) => {
            // console.log(result)
            this.data=result;//服务器新增数据后，拿到服务器返回的id，赋到note上
            result.status === 0 ? Toast.init('success') : Toast.init('failed')
        })
    };

    _Note.prototype.delete =function(){
        $.post('/api/delete',{id: this.data.id}).then((result)=>{
            result.status === 0 ? Toast.init('success') : Toast.init('failed')
        })
    };

    _Note.prototype.edit=function(){
        $.post('/api/edit',{id: this.data.id,msg: this.data.text}).then((result)=>{
            result.status === 0 ? Toast.init('success') : Toast.init('failed')
        })
    };

    return {
        init(data) {
            new _Note(data)
        }
    }
})();


module.exports = Note;