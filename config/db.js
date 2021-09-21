const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://zero-waste-new:123@zero-waste-new.f1tdn.mongodb.net/Zero-Waste-New?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;