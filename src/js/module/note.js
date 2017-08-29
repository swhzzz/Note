require('scss/note.scss')
var WaterFall = require('module/waterfall')
var Toast = require('module/toast')

var Note = (function () {
    function _Note(opts) {
        this.initOpts(opts);
        //this.data = opts || {id: '', text: '在这里输入内容',createdAt: ''};//这个createdAt为了不在新建的时候，时间显示undefined
        this.createNode();
        this.bindEvent();
    }

    _Note.prototype.initOpts = function (opts) {
        // console.log(opts);
        if (opts) {//这里是从数据库加载的数据
            opts.createdAt = opts.createdAt.substr(0, 10);//截取时间
            this.data = opts;
            console.log(this.data)
        } else {//新增的data初始化
            this.data = {id: '', text: '在这里输入内容', createdAt: '', username: ''};//这里是点击新增的时候的数据
        }
    };

    _Note.prototype.createNode = function () {
        var tpl = `<div class="note transition flipInX">
               <div class="note-head"></div>
               <div class="close">x</div>
               <div class="note-content" contenteditable="true" spellcheck="false">${this.data.text}</div> 
               <div class="username">${this.data.username}</div>
               <div class="time">${this.data.createdAt}</div>
            </div>`;
        this.$note = $(tpl);
        this.$noteHead = this.$note.find('.note-head');
        this.$noteContent = this.$note.find('.note-content');
        this.$noteContent.data('oldText', this.data.text);
        $('main').append(this.$note);
    };

    _Note.prototype.bindEvent = function () {
        //拖拽
        this.$noteHead.on('mousedown', (e) => {
            var evtX = e.pageX - this.$note.offset().left;//获取当前鼠标距离左侧边框的距离
            var evtY = e.pageY - this.$note.offset().top;
            this.$note.removeClass('transition').addClass('draggable').data('evtPos', {'x': evtX, 'y': evtY})//保存数据到data中
        }).on('mouseup', () => {
            this.$note.removeClass('draggable ').addClass('transition')
        });

        this.$note.on('mouseover', () => {
            this.$note.find('.close').fadeIn()
        }).on('mouseleave', () => {
            this.$note.find('.close').fadeOut()
        });


        this.$note.find('.close').on('click', () => {
            this.delete(this.data.id, this.data.username)
        });

        this.$noteContent.on('focus', () => {
            if (this.data.text === '在这里输入内容') {
                this.$noteContent.html('')
            }
        });

        this.$noteContent.on('blur', () => {
            var oldText = this.$noteContent.data('oldText');
            var newText = this.$noteContent.html();
            // console.log(newText);
            if (!this.data.id) {//id不存在
                if (newText) {
                    this.add(newText)
                } else {
                    this.$note.remove()
                }
            } else if (oldText !== newText) {
                this.edit(oldText,newText, this.data.id, this.data.username)
            }
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

    _Note.prototype.add = function (text) {
        $.post('/api/add', {text: text}, (result) => {
            // console.log(result)
            if (result.status === 0) {
                Object.assign(this.data, result);
                console.log(this.data);
                Toast.init('新增成功')
            } else {
                this.$note.remove();
                Toast.init(result.errorMsg)
            }
        })
    };

    _Note.prototype.delete = function (id, username) {//id为note的id
        console.log(id,username)
        $.post('/api/delete', {id: id, username: username}, (result) => {
            if (result.status === 0) {
                this.$note.remove();
                Toast.init('删除成功');
                WaterFall.init($('main'))
            } else {
                Toast.init(result.errorMsg)
            }
        })
    };

    _Note.prototype.edit = function (oldText,newText, id, username) {
        $.post('/api/edit', {text: newText, id: id, username: username}, (result) => {
            if (newText === '') {//如果修改后内容为空，则删除
                console.log('删除了')
                return this.delete(id,username);
            }
            if (result.status === 0) {
                Object.assign(this.data, result);
                this.$noteContent.html(newText);
                Toast.init('修改成功')
            } else {//未登录时，显示你提示信息，并把内容重置
                this.$noteContent.html(oldText)
                Toast.init(result.errorMsg)
            }
        })
    };

    return {
        init(data) {
            new _Note(data)
        }
    }
})();


module.exports = Note;