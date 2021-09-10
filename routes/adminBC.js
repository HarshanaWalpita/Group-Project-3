const express = require('express');
const ABCrouter = express.Router()
const mongoose = require('mongoose');

const schema = mongoose.Schema

const ABCschema = new schema({
    buyerId : String,
    companyId : String ,
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

ABCrouter.get('/getallcompanyposts' , (req,res)=>{
    ABCmodel.find(function(docs,err){
        if(!err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})

ABCrouter.post('/getcompanyoffers' , (req,res)=>{
    ABSmodel.find({companyId:req.body._id} , (docs,err)=>{
        if(!err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})


module.exports = ABCrouter