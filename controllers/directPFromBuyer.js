const express = require("express");
const mongoose = require("mongoose");

const BuyerNotifyCompany = require("../models/BuyerNotifyCompany");

exports.getdirectPFromBuyer= async (req,res)=>{
    BuyerNotifyCompany.find().exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
}