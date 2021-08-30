const express = require("express");
const mongoose = require("mongoose");

const CompanyDetail = require("../models/CompanyDetail");

exports.addCompanyDetails= async (req,res)=>{
    const { companyName, companyContact, address, wasteType, wasteItem, companyId, description} = req.body;

    const newCompanyDetails = new CompanyDetail({ companyName, companyContact, address, wasteType, wasteItem, companyId, description})

    try {
        await newCompanyDetails.save();

        res.status(201).json(newCompanyDetails);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

exports.viewCompanyDetails = async (req, res) => {
    let companyId = req.params.companyId;
    CompanyDetail.find({ companyId: companyId }).exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            sucess: true,
            existingPosts: posts
        });
    });
};

exports.editCompanyDetails = async (req, res) => {
    const { id } = req.params;
    const { companyName, companyContact, address, wasteType, wasteItem, description} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { companyName, companyContact, address, wasteType, wasteItem, description, _id: id };

    await CompanyDetail.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

exports.companyGetOneCompanyDetail= async (req,res)=>{
    let postId = req.params.id;

    CompanyDetail.findById(postId,(err,post)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            onePost:post
        })
    })
}