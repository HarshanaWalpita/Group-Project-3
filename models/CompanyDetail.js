const mongoose = require('mongoose');

const companyDetailsSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required:true
    },
    companyContact:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    CreatedAt: {
        type: Date,
        default: new Date(),
    },
    wasteType: {
        type: String,
        required:true
    },
    wasteItem: {
        type: String,
        required:true
    },
    companyId: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:false
    }
});

module.exports = mongoose.model('CompanyDetails', companyDetailsSchema);