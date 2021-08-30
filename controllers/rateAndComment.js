const express = require("express");
const mongoose = require("mongoose");

const RateAndComment = require("../models/RateAndComment");

exports.addRateAndComment= async (req,res)=>{
    const { commenterName, commenterId, comment, rating, commentAboutName, commentAboutId} = req.body;

    const newRateAndComment = new RateAndComment({ commenterName, commenterId, comment, rating, commentAboutName, commentAboutId})

    try {
        await newRateAndComment.save();

        res.status(201).json(newRateAndComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

exports.viewRateAndComment= async (req,res)=>{
    RateAndComment.find().exec((err,comments)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingComments:comments
        });
    });
}