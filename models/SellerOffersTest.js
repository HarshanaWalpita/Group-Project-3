const mongoose = require('mongoose');

const sellerOfferTestSchema = new mongoose.Schema({
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
    quantity:{
        type:Number,
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
    }
});

const SellerOfferTest = module.exports = mongoose.model('SellerOfferTest', sellerOfferTestSchema);