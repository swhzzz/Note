import $ from 'jquery'
import 'scss/toast.scss'

let Toast = (function () {
    function _Toast(msg) {
        this.msg = msg;
        this.create(this.msg)
    }

    _Toast.prototype.create= function (msg) {
        let $div = $(`<div class="toast">${msg}</div>`);
        $('body').append($div);
        $div.fadeIn(700, () => {
            $div.fadeOut(700, () => {
                $div.remove()
            })
        })
    }

    return {
        init(msg){
            new _Toast(msg)
        }
    }
})()

module.exports = Toast;