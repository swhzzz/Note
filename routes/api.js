var express = require('express');
var router = express.Router();
var Note = require('../model/note');

router.get('/fetch', (req, res) => {
    Note.findAll({raw: true}).then((notes) => {
        // console.log(notes)
        res.send(notes);
    })
});

router.post('/add', (req, res) => {
    // console.log(req);
    // console.log(req.session.user);
    if(!req.session.user){
       return res.send({status: 1,errorMsg: '请先登录'});
    }
    let username =req.session.user.username;
    Note.create({text: req.body.text,username:username});
    Note.findAll({raw: true}).then((notes) => {
        // console.log(username)
        var lastOneId = notes.pop().id;
        res.send({id: lastOneId, status: 0,username: username});//id为note的id
    })
});

router.post('/delete', (req, res) => {
    // console.log(req.body);
    if(!req.session.user){
        return res.send({status: 1,errorMsg: '请先登录'});
    }
    let username = req.session.user.username;
    Note.destroy({where: {id: req.body.id,username:username}}).then(() => {
        res.send({status: 0})
    })
});

router.post('/edit', (req, res) => {
    // console.log(req);
    if(!req.session.user){
        return res.send({status: 1,errorMsg: '请先登录'});
    }
    let username = req.session.user.username;
    Note.update({text: req.body.text},{where: {id: req.body.id,username:username}}).then(() => {
        res.send({status: 0})
    })
});


module.exports = router;