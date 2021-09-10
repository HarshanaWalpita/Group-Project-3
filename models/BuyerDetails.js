const mongoose = require("mongoose");


const BuyerDetailsSchema = new mongoose.Schema({
    buyerId: String,
    buyerName: String,
    buyerDescription: String,
    buyerAddress: String,
    buyerContact: [String],
    favouriteAreas: [String],
    favouriteWasteTypes: [String],
    favouriteWasteItems: [String],
    buyerImages: [String],
})

const BuyerDetails = mongoose.model("BuyerDetails", BuyerDetailsSchema);

module.exports = BuyerDetails;