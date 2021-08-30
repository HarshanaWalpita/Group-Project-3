const mongoose = require('mongoose');

const rateAndCommentSchema = new mongoose.Schema({
    commenterName:{
        type:String,
        required:true
    },
    commenterId:{
        type:String,
        required:true
    },
    comment: {
        type: String,
        required:false
    },
    rating: {
        type: String,
        required:false
    },
    commentAboutName: {
        type: String,
        required:true
    },
    commentAboutId: {
        type: String,
        required:true
    },
    CreatedAt: {
        type: Date,
        default: new Date(),
    }
});

module.exports = mongoose.model('RateAndComment', rateAndCommentSchema);