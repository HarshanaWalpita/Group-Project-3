const express = require("express");
const mongoose = require("mongoose");

const CompanyDashboard = require("../models/CompanyDashboard");

exports.viewCompanyDashboard = async (req, res) => {
    let companyId = req.params.companyId;
    CompanyDashboard.find({ companyId: companyId }).exec((err, posts) => {
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