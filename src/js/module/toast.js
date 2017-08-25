import $ from 'jquery'
import 'scss/toast.scss'

function Toast(msg) {
    this.msg=msg
    this.init(this.msg)
}
Toast.prototype.init =function(msg){
    let $div = $(`<div class="toast">${msg}</div>`);
    $('body').append($div);
    $div.fadeIn(700, () => {
        $div.fadeOut(700,()=>{
            $div.remove()
        })
    })
}

module.exports = Toast;