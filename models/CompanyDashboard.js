const mongoose = require('mongoose');

const companyDashboardSchema = new mongoose.Schema({
    date:{
        type: Date,
        required:true
    },
    amount:{
        type: Number,
        required:true
    },
    wasteType: {
        type: String,
        required:true
    },
    wasteItem: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    companyId: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('CompanyDashboard', companyDashboardSchema);