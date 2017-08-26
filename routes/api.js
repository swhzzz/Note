var express = require('express');
var router = express.Router();
var Note = require('../model/note');

router.get('/fetch', (req, res, next) => {
    Note.findAll({raw: true}).then((notes) => {
        // console.log(notes)
        res.send(notes);
    })
});

router.post('/add', (req, res, next) => {
    // console.log(req);
    Note.create({text: req.body.msg});//创建
    Note.findAll({raw: true}).then((notes) => {//创建成功后，查找当前的id，并返回
        // console.log(notes)
        let lastOneId = notes.pop().id;
        res.send({id: lastOneId, status: 0});//创建成功，告诉前端
    })
});

router.post('/delete', (req, res, next) => {
    // console.log(req.body);
    Note.destroy({where: {id: req.body.id}}).then(() => {
        res.send({status: 0})//删除成功，告诉前端
    })
});

router.post('/edit', (req, res, next) => {
    // console.log(req);
    Note.update({text: req.body.msg},{where: {id: req.body.id}}).then(() => {

        res.send({status: 0})//更新成功
    })
});


module.exports = router;