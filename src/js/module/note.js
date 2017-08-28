require('scss/note.scss')
const WaterFall = require('module/waterfall')
const  Toast = require('module/toast')

let Note = (function () {
    function _Note(opts) {
        this.initOpts(opts);
        //this.data = opts || {id: '', text: '在这里输入内容',createdAt: ''};//这个createdAt为了不在新建的时候，时间显示undefined
        this.createNode();
        this.bindEvent();
    }

    _Note.prototype.initOpts = function (opts) {
        // console.log(opts);
        if (opts) {//这里是从数据库加载的数据
            opts.createdAt = opts.createdAt.substr(0, 19);//截取时间
            this.data = opts;
        } else {
            this.data = {id: '', text: '在这里输入内容', createdAt: ''};//这里是点击新增的时候的数据
        }
    };

    _Note.prototype.createNode = function () {
        let tpl = `<div class="note transition flipInX">
               <div class="note-head"></div>
               <div class="close">x</div>
               <div class="note-content" contenteditable="true">${this.data.text}</div> 
               <div class="time">${this.data.createdAt}</div>
            </div>`;
        this.$note = $(tpl);
        this.$noteHead = this.$note.find('.note-head');
        this.$noteContent = this.$note.find('.note-content');
        this.$noteContent.data('oldText', this.data.text);
        $('main').append(this.$note);
    };

    _Note.prototype.bindEvent = function () {
        this.$noteContent.on('focus', () => {
            if (this.data.text === '在这里输入内容') {
                this.$noteContent.html('')
            }
        });

        this.$noteHead.on('mousedown', (e) => {
            let evtX = e.pageX - this.$note.offset().left;//获取当前鼠标距离左侧边框的距离
            let evtY = e.pageY - this.$note.offset().top;
            this.$note.removeClass('transition').addClass('draggable').data('evtPos', {'x': evtX, 'y': evtY})//保存数据到data中
        }).on('mouseup', () => {
            this.$note.removeClass('draggable ').addClass('transition')
        });

        this.$note.on('mouseover', () => {
            this.$note.find('.close').fadeIn()
        }).on('mouseleave', () => {
            this.$note.find('.close').fadeOut()
        });

        this.$noteContent.on('blur', () => {
            let text = this.$noteContent.html();
            let oldText = this.$noteContent.data('oldText');
            // console.log(oldText, text)
            if (oldText !== text) {
                if (this.data.id) {
                    if (text === '') {
                        this.delete();
                        this.$note.remove();
                        WaterFall.init($('main'));
                        // Toast.init('请输入内容');
                        return;
                    }
                    this.data.text = text;
                    this.edit()
                } else {
                    this.data.text = text
                    this.add()
                }
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
            this.data = result;//服务器新增数据后，拿到服务器返回的id，赋到note上
            // console.log(this.data)
            result.status === 0 ? Toast.init('添加成功') : Toast.init('添加失败')
        })
    };

    _Note.prototype.delete = function () {
        $.post('/api/delete', {id: this.data.id}).then((result) => {
            result.status === 0 ? Toast.init('删除成功') : Toast.init('删除失败')
        })
    };

    _Note.prototype.edit = function () {
        $.post('/api/edit', {id: this.data.id, msg: this.data.text}).then((result) => {
            result.status === 0 ? Toast.init('编辑成功') : Toast.init('编辑失败')
        })
    };

    return {
        init(data) {
            new _Note(data)
        }
    }
})();


module.exports = Note;