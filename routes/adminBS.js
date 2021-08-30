const express = require('express');
const ABSrouter = express.Router()
const mongoose = require('mongoose');

const schema = mongoose.Schema

const ABSschema = new schema({
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

ABSrouter.post('/getuseroffers' , (req,res)=>{
    ABSmodel.find({buyerId:req.body._id} , (docs,err)=>{
        if(!err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})

module.exports = ABSrouter