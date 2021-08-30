const express = require('express');
const ABCrouter = express.Router()
const mongoose = require('mongoose');

const schema = mongoose.Schema

const ABCschema = new schema({
    buyerId : String,
    sellerId : String ,
    postId : String,
    status : String,
    value : Number,
    expiryDate : Date
})

const ABSmodel = mongoose.model('buyeroffersforsellers',ABSschema);

ABSrouter.get('/test2' , (req,res)=>{
    res.end('Hello')
})

ABSrouter.get('/getofferedsellers' , (req,res)=>{
    ABSmodel.find({status:"accepted" } , function(docs,err){
        if(!err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})


module.exports = ABSrouter