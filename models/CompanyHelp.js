const mongoose = require('mongoose');

const companyHelpSchema = new mongoose.Schema({
    choice: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:false
    },
    companyId: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('CompanyHelp', companyHelpSchema);