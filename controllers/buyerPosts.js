const express = require("express");
const mongoose = require("mongoose");

const SellerPost = require("../models/SellerPost");
const CompanyPost = require("../models/CompanyPost");
const CompanyDetails = require("../models/CompanyDetail");
const User = require("../models/User");
const BuyerDetails = require("../models/BuyerDetails");

exports.getPosts= async (req,res)=>{
    SellerPost.find().exec((err,posts)=>{
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

exports.getOnePost= async (req,res)=>{
    let postId = req.params.id;

    SellerPost.findById(postId,(err,post)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            onePost:post
        })
    })
}

exports.getCompanyPosts= async (req,res)=>{
    CompanyPost.find().exec((err,posts)=>{
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

exports.getOneCompanyPost= async (req,res)=>{
    let postId = req.params.id;

    CompanyPost.findById(postId,(err,post)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            onePost:post
        })
    })
}

exports.getBuyerCompanyDetails= async (req,res)=>{
    CompanyDetails.find().exec((err,posts)=>{
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

exports.getOneSellerOrCompany= async (req,res)=>{
    let sellerOrCompanyId = req.params.id;

    User.findById(sellerOrCompanyId,(err,sellerOrCompany)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            oneSellerOrCompany:sellerOrCompany
        })
    })
}

exports.getBuyerDetails= async (req,res)=>{
    BuyerDetails.find().exec((err,buyers)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingBuyers:buyers
        });
    });
}

exports.deleteBuyer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

exports.deleteBuyerDetails = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await BuyerDetails.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

