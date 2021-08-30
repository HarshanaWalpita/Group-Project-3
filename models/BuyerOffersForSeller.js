const mongoose = require('mongoose');

const sellerOfferSchema = new mongoose.Schema({
    value:{
        type: Number,
        required:true
    },
    expiryDate:{
        type:Date,
        required:true
    },
    collectingDate:{
        type:Date,
        required:true
    },
    collectingTime:{
        type:String,
        required:true
    },
    offerCreatedAt: {
        type: Date,
        default: new Date(),
    },
    status: {
        type: String,
        required:true
    },
    buyerId: {
        type: String,
        required:true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId, ref:'SellerPost',
        required:true
    },
    wasteItemsListId: {
        type: String,
        required:false
    },
    sellerId: {
        type: String,
        required:false
    },
    sellerName: {
        type: String,
        required:false
    },
    offerThumbnail: {
        type: String,
        required:false
    },
    buyerName: {
        type: String,
        required:true
    },
    collectedStatus: {
        type: String,
        default: "pending"
    },
    verificationCode: {
        type: Number,
        default: null
    }


});

module.exports = mongoose.model('BuyerOffersForSeller', sellerOfferSchema);