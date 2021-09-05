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

const ABCmodel = mongoose.model('buyeroffersforcompanies',ABCschema);

ABCrouter.get('/test5' , (req,res)=>{
    res.end('Hello')
})

ABCrouter.get('/getofferedcompanies' , (req,res)=>{
    ABCmodel.find({status:"accepted" } , function(docs,err){
        if(!err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})


module.exports = ABCrouter