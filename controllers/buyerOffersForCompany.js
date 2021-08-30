const express = require("express");
const mongoose = require("mongoose");

const BuyerOffersForCompany = require("../models/BuyerOffersForCompany");
const BuyerNotifyCompany = require("../models/BuyerNotifyCompany");
const CompanyDetail = require("../models/CompanyDetail");
const CompanyPost = require("../models/CompanyPost");

exports.addCompanyOffer= async (req,res)=>{
    const { value, expiryDate, collectingDate, collectingTime, quantity, status, buyerId, postId, companyId, companyName, buyerName } = req.body;

    const newCompanyOffer = new BuyerOffersForCompany({ value, expiryDate, collectingDate, status, collectingTime, quantity, buyerId, postId, companyId, companyName, buyerName})

    try {
        await newCompanyOffer.save();

        res.status(201).json(newCompanyOffer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

exports.viewPendingCompanyOffers= async (req,res)=>{
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

exports.deletePendingCompanyOffer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await BuyerOffersForCompany.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

exports.editPendingCompanyOffer = async (req, res) => {
    const { id } = req.params;
    const { value, expiryDate, collectingDate, collectingTime, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { value, expiryDate, collectingDate, collectingTime, quantity, _id: id };

    await BuyerOffersForCompany.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

exports.buyerGetOneCompanyOffer= async (req,res)=>{
    let offerId = req.params.id;

    BuyerOffersForCompany.findById(offerId,(err,offer)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            oneOffer:offer
        })
    })
}

exports.addBuyerNotifyCompany= async (req,res)=>{
    const { value, expiryDate, wasteType, wasteItem, quantity, deliveryDate, buyerId, companyListId , companyId, buyerName } = req.body;

    const newNotifyCompany = new BuyerNotifyCompany({ value, expiryDate, wasteType, wasteItem, quantity, deliveryDate, buyerId, companyListId, companyId, buyerName})

    try {
        await newNotifyCompany.save();

        res.status(201).json(newNotifyCompany);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

exports.companyViewDetailsForBuyer= async (req,res)=>{
    CompanyDetail.find().exec((err,buyers)=>{
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

exports.buyerGetOneCompanyPost= async (req,res)=>{
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