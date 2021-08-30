const mongoose = require('mongoose');

const companyNotificationsSchema = new mongoose.Schema({
    image: {
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        required:true
    },
    description: {
        type: String,
        required:true
    },companyId: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('CompanyNotifications', companyNotificationsSchema);