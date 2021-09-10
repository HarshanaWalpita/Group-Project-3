const express = require("express");
const mongoose = require("mongoose");

const BuyerOffersForCompany = require("../models/BuyerOffersForCompany");

exports.viewOffersForCompany= async (req,res)=>{
    BuyerOffersForCompany.find().exec((err,offers)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingOffers:offers
        });
    });
}
