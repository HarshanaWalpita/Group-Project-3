require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const AuserRoute = require('./routes/adminUser')
const ABSRoute = require('./routes/adminBS')
const cors = require("cors");

app.use(cors());
connectDB();



app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Api running");
});

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use('/api/adminuser' , AuserRoute);
app.use('/api/adminBS' , ABSRoute);

const postRoutes = require("./routes/posts.js");
app.use(cors());
const buyerPosts = require("./routes/buyerPosts");
const buyerOffersForSeller = require("./routes/buyerOffersForSeller");
const buyerOffersForCompany = require("./routes/buyerOffersForCompany");
const complaint = require("./routes/complaint");
const getHelp = require("./routes/getHelp");
const rateAndComment = require("./routes/rateAndComment");
app.use(buyerPosts);
app.use(buyerOffersForSeller);
app.use(buyerOffersForCompany);
app.use(complaint);
app.use(getHelp);
app.use(rateAndComment);

const buyerProfile = require("./routes/buyerProfile");
app.use(buyerProfile);


const companyPosts = require("./routes/companyPosts");
const companyDetail = require("./routes/companyDetail");
app.use(companyPosts);
app.use(companyDetail );

const contactBuyer = require("./routes/contactBuyer");
app.use(contactBuyer);


app.use('/api/adminuser' , AuserRoute);


app.use('/posts', postRoutes);
//seller

const sellerPostRoutes = require("./routes/sellerPosts");
const sellerViewBuyerRoutes = require("./routes/SellerViewBuyers");
const sellerRateAndComment = require("./routes/sellerViewBuyerComments");
app.use(sellerViewBuyerRoutes);
app.use(sellerPostRoutes);
app.use(sellerRateAndComment);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});