const express = require("express");
const mongoose = require("mongoose");

const SellerPost = require("../models/SellerPost");
const BuyerOffersForSeller = require("../models/BuyerOffersForSeller");

exports.sellerAddPost = async (req, res) => {
    const sellerId = req.body.sellerId;
    const sellerName = req.body.sellerName;
    const postType = req.body.postType;
    const buyer = req.body.buyer;
    const sellerDistrict = req.body.district;
    const address = req.body.address;
    const location = req.body.location;
    const contact = Number(req.body.contact);
    const thumbnail = req.body.thumbnail;
    const wasteItemList = req.body.wasteItemList;

    const newSellerPost = new SellerPost({
        sellerId,
        sellerName,
        postType,
        buyer,
        sellerDistrict,
        address,
        location,
        contact,
        thumbnail,
        wasteItemList
    })
    try {
        await newSellerPost.save();

        res.status(201).json(newSellerPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

};
exports.sellerViewAllPosts = async (req, res) => {
    let sellerId = req.params.id;
    SellerPost.find({ "sellerId": sellerId }).exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingPosts: posts,
            
        });
    
    })
}
exports.sellerViewAllOffers = async (req, res) => {
    let sellerId = req.params.id;
    BuyerOffersForSeller.find({ "sellerId": sellerId }).exec((err, offers) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingOffers: offers,
         
        });
    })
}

exports.viewItemOffers = async (req, res) => {
    let itemId = req.params.id;
    BuyerOffersForSeller.find({"wasteItemsListId": itemId}).exec((err, offers) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingOffers: offers,
         
        });
    })
}
exports.sellerViewPosts = async (req, res) => {

    let sellerIdd = req.params.id;
    var posts = [{}];
    SellerPost.find({ "sellerId": sellerIdd }).exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        posts = posts;
        BuyerOffersForSeller.find({ "sellerId": sellerIdd }).exec((err2, offers) => {
            if (err2) {
                return res.status(400).json({
                    error: err2
                });
            }
            return res.status(200).json({
                success: true,
                existingPosts: posts,
                existingOffers: offers
            });

        })
        
    });

    
}

exports.sellerUpdatePost = async (req, res) => {
    const { id } = req.params;
    const sellerDistrict = req.body.district;
    const address = req.body.address;
    const location = req.body.location;
    const contact = req.body.contact;
    const thumbnail = req.body.thumbnail;
    const wasteItemList = req.body.wasteItemList;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { sellerDistrict, address, location, contact, thumbnail, wasteItemList,  _id: id};
    await BuyerOffersForSeller.updateMany({ "postId": id }, { $set: { status: "decline" } });

    
    await SellerPost.findByIdAndUpdate(id, updatedPost, { new: true });

    
    res.json("Post Updated");

}

exports.sellerViewOffers = async (req, res) => {
    let seller = req.params.id;
    BuyerOffersForSeller.find({ "sellerId": seller, "status": "pending" }).populate('postId').exec((err, posts) => {
        
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingOffers: posts
        });
    });

    
}

exports.sellerViewOnePostDetails = async (req, res) => {
    let postId = req.params.id;
    var post = {};
    SellerPost.findOne({ "_id": postId }).exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }   
        post = posts;
        BuyerOffersForSeller.find({ "postId": postId, "status": "pending", "wasteItemsListId":"completePost" }).exec((err2, offers) => {
            if (err2) {
                return res.status(400).json({
                    error: err2
                });
            }
            return res.status(200).json({
                success: true,     
                post: post,
                offer: offers,
            });
        }); 
    });
    
    
}
exports.sellerViewPrvPost = async (req, res) => {
    let postId = req.params.id;

    SellerPost.findOne({ "_id": postId }).exec((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            return res.status(200).json({
                success: true,     
                post: post,
                
            });
        }
    })
}

exports.sellerViewPrvOffers = async (req, res) => {
    let postId = req.params.id;
    BuyerOffersForSeller.find({ "postId": postId, "status": "accepted" }).exec((err, offer) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,  
            offers: offer,
        });
    })

}

exports.sellerAcceptPostOffer = async (req, res) => {
    const { id } = req.params;
    const { status, postId, verificationCode } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedOffer = { status, verificationCode,  _id: id};
    await BuyerOffersForSeller.updateMany({ "postId": postId, "_id": { $ne: id } }, { $set: { status: "declined" } });

    
    await BuyerOffersForSeller.findByIdAndUpdate(id, updatedOffer, { new: true });

    
    res.json("Offer Accepted");
}

exports.sellerAcceptWasteItemOffer = async(req, res) => {
    const { id } = req.params;
    const { postId, status, wasteItemsListId, verificationCode } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedOffer = { status, verificationCode, _id: id};
    await BuyerOffersForSeller.updateMany({ "wasteItemsListId": wasteItemsListId, "_id": { $ne: id } }, { $set: { status: "declined" } });
    await BuyerOffersForSeller.updateMany({ "wasteItemsListId": "completePost", "postId": postId, "_id": { $ne: id } }, { $set: { status: "declined" } });
    await BuyerOffersForSeller.findByIdAndUpdate(id, updatedOffer, { new: true });
    
}

exports.sellerDeclineOffer = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedOffer = { status };
    await BuyerOffersForSeller.findByIdAndUpdate(id, updatedOffer, { new: true });
    
    res.json("Offer Accepted");
}



exports.sellerDeclineOffer = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedOffer = { status };
    await BuyerOffersForSeller.findByIdAndUpdate(id, updatedOffer, { new: true });
    
    res.json("Offer Accepted");
}

exports.sellerViewAcceptedOffers = async (req, res) => {
    let seller = req.params.id;
    BuyerOffersForSeller.find({  "sellerId": seller, "status": "accepted"}).populate('postId').exec((err, offers) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            acceptedOffers: offers
        });
    });

}

exports.deletePendingSellerPost = async (req, res) => {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await BuyerOffersForSeller.updateMany({ "postId": id }, { $set: { status: "decline" } });
    await SellerPost.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}
