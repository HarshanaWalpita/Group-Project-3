const express = require("express");
const mongoose = require("mongoose");

const CompanyPost = require("../models/CompanyPost");
const BuyerOffersForCompany = require("../models/BuyerOffersForCompany");
const BuyerDetails = require("../models/BuyerDetails");
const BuyerNotifyCompany = require("../models/BuyerNotifyCompany");
const CompanyDetail = require("../models/CompanyDetail");
const User = require("../models/User");

exports.addCompanyPost= async (req,res)=>{
    const { companyId, companyName, postType, buyer, address, contact, wasteType, item, avbDate, quantity} = req.body;

    const newCompanyPost = new CompanyPost({ companyId, companyName, postType, buyer, address, contact, wasteType, item, avbDate, quantity})

    try {
        await newCompanyPost.save();

        res.status(201).json(newCompanyPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

exports.getCompanyPostsForCompany= async (req,res)=>{
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

exports.viewPendingCompanyOffersForCompany= async (req,res)=>{
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

exports.getBuyerDetailsForCompany= async (req,res)=>{
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

exports.deleteCompanyPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await CompanyPost.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

exports.editCompanyPost = async (req, res) => {
    const { id } = req.params;
    const { contact, wasteType, item, avbDate, quantity} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { contact, wasteType, item, avbDate, quantity, _id: id };

    await CompanyPost.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

exports.companyGetOneCompanyPost= async (req,res)=>{
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

exports.editCompanyOfferStatus = async (req, res) => {
    const { id } = req.params;
    const { status} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { status, _id: id };

    await BuyerOffersForCompany.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

exports.getNotifyDetailsForCompany= async (req,res)=>{
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

exports.getCompanyDetailsForCompany= async (req,res)=>{
    CompanyDetail.find().exec((err,company)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingCompany:company
        });
    });
}

exports.deleteCompany = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

exports.deleteCompanyDetails = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await CompanyDetail.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}


