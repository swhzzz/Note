const Note =require('../model/note')

var express = require('express');
var router = express.Router();

router.get('/xx',(req,res,next)=>{
    Note.findAll({raw:true}).then((notes)=>{
        console.log(notes)
       res.send(notes)
    })
    // next()
})

module.exports=router;