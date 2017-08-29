var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var data={}
    if(req.session.user){
        data = {
            title: '便利贴',
            isLogin: true,
            user: req.session.user
        }
    }else{
        data={
            title: '便利贴',
            isLogin: false,
        }
    }
    res.render('index', data);
});

module.exports = router;