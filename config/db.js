const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://harshana:123@zero-waste.wrgcc.mongodb.net/Zero-Waste?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;
