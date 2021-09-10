const express = require('express');
const AmsgRouter = express.Router()
const mongoose = require('mongoose');

const schema = mongoose.Schema

const Amsgschema = new schema({
    CreatedAt : Date,
    message : String ,
    userName : String,
    userEmail : String
})

const Amsgmodel = mongoose.model('gethelps',Amsgschema);

AmsgRouter.get('/test4' , (req,res)=>{
    res.end('Hello')
})

AmsgRouter.get('/getmessages' , (req,res)=>{
    Amsgmodel.find(function(docs,err){
        if(!err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})


module.exports = AmsgRouter