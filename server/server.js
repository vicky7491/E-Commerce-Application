
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); 
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminBookingRouter = require('./routes/admin/booking-routes');
const castingKitRoutes = require('./routes/admin/casting-kit-routes');

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const shopcastingKitRoutes = require("./routes/shop/casting-kit");
const commonBookingRouter = require('./routes/common/booking-routes');
const commonFeatureRouter = require("./routes/common/feature-routes");

//create a database connection -> u can also
//create a separate file for this and then import/use that file here

mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));
  
const app = express();
const PORT = process.env.PORT || 5000;
console.log("Using MONGO_URI:", process.env.MONGO_URI);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use('/api/admin/bookings', adminBookingRouter);
app.use('/api/admin/casting-kits', castingKitRoutes);


app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/casting-kits", shopcastingKitRoutes);
app.use("/api/common/feature", commonFeatureRouter);
app.use('/api/bookings', commonBookingRouter);


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
