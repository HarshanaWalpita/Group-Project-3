const express = require("express");
const mongoose = require("mongoose");

const BuyerDetails = require("../models/BuyerDetails");

exports.buyerAddDetails = async (req, res) => {
    const buyerId = req.body.buyerId;
    const buyerName = req.body.buyerName;
    const buyerDescription = req.body.buyerDescription;
    const buyerAddress = req.body.buyerAddress;
    const buyerContact = req.body.buyerContact;
    const favouriteAreas = req.body.favouriteAreas;
    const favouriteWasteTypes = req.body.favouriteWasteTypes;
    const favouriteWasteItems = req.body.favouriteWasteItems;
    const buyerImages = req.body.buyerImages;

    const newBuyer = new BuyerDetails({
        buyerId,
        buyerName,
        buyerDescription,
        buyerAddress,
        buyerContact,
        favouriteAreas,
        favouriteWasteTypes,
        favouriteWasteItems,
        buyerImages
    })
    try {
        await newBuyer.save();

        res.status(201).json(newBuyer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

};

exports.buyerViewDetails = async (req, res) => {
    let buyerId = req.params.buyerId;
    BuyerDetails.find({ buyerId: buyerId }).exec((err, posts) => {
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

exports.buyerUpdateDetails = async (req, res) => {
    let id = req.params.id
    const { buyerDescription, buyerAddress, buyerContact, favouriteAreas, favouriteWasteTypes, favouriteWasteItems, buyerImages } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { buyerDescription, buyerAddress, buyerContact, favouriteAreas, favouriteWasteTypes, favouriteWasteItems, buyerImages, _id: id };

    await BuyerDetails.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
};