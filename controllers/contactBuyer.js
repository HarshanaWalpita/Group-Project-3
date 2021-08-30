const express = require("express");
const mongoose = require("mongoose");

const ContactBuyer = require("../models/ContactBuyer");

exports.addContactBuyer = async (req,res)=>{
    const { wasteType, wasteItem, quantity, requiredDate, companyId, buyerListId} = req.body;

    const newContactBuyer = new ContactBuyer({ wasteType, wasteItem, quantity, requiredDate, companyId, buyerListId})

    try {
        await newContactBuyer.save();

        res.status(201).json(newContactBuyer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

