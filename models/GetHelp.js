const mongoose = require('mongoose');

const getHelpSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    CreatedAt: {
        type: Date,
        default: new Date(),
    },
    userName: {
        type: String,
        required:true
    },
    userEmail: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('GetHelp', getHelpSchema);