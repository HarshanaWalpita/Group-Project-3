const express = require('express');
const AcompRouter = express.Router()
const mongoose = require('mongoose');

const schema = mongoose.Schema

const Acompschema = new schema({
    complaintCreatedAt : Date,
    complaintAbout : String ,
    complaintDetails : String,
    userName : String,
    userEmail : String
})

const Acompmodel = mongoose.model('complaints',Acompschema);

AcompRouter.get('/test3' , (req,res)=>{
    res.end('Hello')
})

AcompRouter.get('/getcomplaints' , (req,res)=>{
    Acompmodel.find(function(docs,err){
        if(!err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})


module.exports = AcompRouter