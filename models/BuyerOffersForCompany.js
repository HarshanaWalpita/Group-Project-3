const mongoose = require('mongoose');

const buyerOfferForCompanySchema = new mongoose.Schema({
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
        type: String,
        required:true
    },
    companyId: {
        type: String,
        required:false
    },
    companyName: {
        type: String,
        required:false
    },
    buyerName: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('BuyerOffersForCompany', buyerOfferForCompanySchema);