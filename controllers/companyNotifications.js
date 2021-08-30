const express = require("express");
const mongoose = require("mongoose");

const CompanyNotifications = require("../models/CompanyNotifications");

exports.viewCompanyNotifications = async (req, res) => {
    let companyId = req.params.companyId;
    CompanyNotifications.find({ companyId: companyId }).exec((err, posts) => {
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