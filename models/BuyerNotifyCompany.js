const mongoose = require('mongoose');

const buyerNotifyCompanySchema = new mongoose.Schema({
    value:{
        type: Number,
        required:true
    },
    expiryDate:{
        type:Date,
        required:true
    },
    wasteType:{
        type:String,
        required:true
    },
    wasteItem:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    deliveryDate:{
        type:Date,
        required:true
    },
    notificationCreatedAt: {
        type: Date,
        default: new Date(),
    },
    buyerId: {
        type: String,
        required:true
    },
    companyListId: {
        type: String,
        required:true
    },
    companyId: {
        type: String,
        required:true
    },
    buyerName: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('BuyerNotifyCompany', buyerNotifyCompanySchema);