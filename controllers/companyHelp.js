const express = require("express");
const mongoose = require("mongoose");

const CompanyPost = require("../models/CompanyHelp");

exports.addCompanyHelp= async (req,res)=>{
    const { choice, description, companyId} = req.body;

    const newCompanyPost = new CompanyPost({ choice, description, companyId})

    try {
        await newCompanyHelp.save();

        res.status(201).json(newCompanyHelp);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};