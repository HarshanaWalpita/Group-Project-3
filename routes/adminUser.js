const express = require('express');
const Arouter = express.Router()
const mongoose = require('mongoose');

const schema = mongoose.Schema

const Adminuserschema = new schema({
    username : String,
    email : String ,
    usertype : String,
})

const Ausermodel = mongoose.model('users',Adminuserschema);

Arouter.get('/test' , (req,res)=>{
    res.end('Hello')
})

Arouter.get('/getbuyers' , (req,res)=>{
    Ausermodel.find({usertype:"buyer"} , function(docs,err){
        if(!err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})

Arouter.get('/getsellers' , (req,res)=>{
    Ausermodel.find({usertype:"seller"} , function(docs,err){
        if(!err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})

Arouter.get('/getcompanies' , (req,res)=>{
    Ausermodel.find({usertype:"company"} , function(docs,err){
        if(!err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})

Arouter.post('/getuserdata' , (req,res)=>{
    Ausermodel.find({_id:req.body._id} , (docs,err)=>{
        if(!err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})

Arouter.post('/updateuser' , (req,res)=>{
    Ausermodel.findOneAndUpdate({_id:req.body._id}, {
        username : req.body.username,
        email : req.body.email
    }, (err)=>{
        if(!err){
           res.send('Post Updated Successfully')
        }
        else{
            res.send(err)
        }
    })
})

Arouter.post('/deleteuser' , (req,res)=>{
    Ausermodel.findOneAndDelete({_id:req.body._id} , (err)=>{
        if(!err){
            res.send('Post deleted successfully')
        }
        else{
            res.send(err)
        }
    })
})

module.exports = Arouter