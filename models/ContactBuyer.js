const mongoose = require('mongoose');

const contactBuyerSchema = new mongoose.Schema({
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
    requiredDate:{
        type:Date,
        required:true
    },
    companyId: {
        type: String,
        required:true
    },
    buyerListId: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('ContactBuyer', contactBuyerSchema);