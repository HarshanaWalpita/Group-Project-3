const express = require("express");
const mongoose = require("mongoose");

const GetHelp = require("../models/GetHelp");

exports.getHelp= async (req,res)=>{
    const { message, userName, userEmail} = req.body;

    const newHelp = new GetHelp({ message, userName, userEmail})

    try {
        await newHelp.save();

        res.status(201).json(newHelp);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};