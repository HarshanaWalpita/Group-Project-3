const express = require("express");
const mongoose = require("mongoose");

const RateAndComment = require("../models/RateAndComment");

exports.sellerViewBuyerComments = async (req, res) => {

    let buyerId = req.params.id;

    RateAndComment.find({ "commentAboutId":buyerId}).exec((err, comments) => {
        if (err) {
            return res.status(400).json({
                error: err
            });

        }
        return res.status(200).json({
            success: true,
            buyerComments: comments
        });
    })
}
