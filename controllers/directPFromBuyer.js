const express = require("express");
const mongoose = require("mongoose");

const BuyerNotifyCompanys = require("../models/BuyerNotifyCompany")

exports.getDirectBuyerOffers= async (req,res)=>{
    BuyerNotifyCompanys.find().exec((err,posts)=>{
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
