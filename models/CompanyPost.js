const mongoose = require("mongoose");

const Address = new mongoose.Schema({
    number: String,
    street: String,
    city: String,
    district: String,
})

const companyPostSchema = new mongoose.Schema({
    companyId: String,
    companyName: String,
    postType: String,
    buyer: String,
    address: Address,
    contact: Number,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    wasteType: String,
    item: String,
    avbDate: Date,
    quantity: Number,
})

const CompanyPost = mongoose.model("CompanyPost", companyPostSchema);

module.exports = CompanyPost;