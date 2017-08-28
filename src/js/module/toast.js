const $ =require('jquery')
require('scss/toast.scss')

let Toast = (function () {
    function _Toast(msg) {
        this.create(msg)
    }

    _Toast.prototype.create= function (msg) {
        let $div = $(`<div class="toast">${msg}</div>`);
        $('body').append($div);
        $div.addClass('animation');
        setTimeout(()=>{
            $div.remove()
        },2500)

    };

    return {
        init(msg){
            new _Toast(msg)
        }
    }
})();

module.exports = Toast;