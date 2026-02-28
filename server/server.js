require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

// Security middleware
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL?.split(","),
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

// Routes
app.use("/api/auth", require("./routes/auth/auth-routes"));
app.use("/api/admin/products", require("./routes/admin/products-routes"));
app.use("/api/admin/orders", require("./routes/admin/order-routes"));
app.use("/api/admin/bookings", require("./routes/admin/booking-routes"));
app.use("/api/shop/products", require("./routes/shop/products-routes"));
app.use("/api/shop/cart", require("./routes/shop/cart-routes"));
app.use("/api/shop/address", require("./routes/shop/address-routes"));
app.use("/api/shop/order", require("./routes/shop/order-routes"));
app.use("/api/shop/search", require("./routes/shop/search-routes"));
app.use("/api/shop/review", require("./routes/shop/review-routes"));
app.use("/api/common/feature", require("./routes/common/feature-routes"));
app.use("/api/bookings", require("./routes/common/booking-routes"));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ status: "API IS RUNNNING" });
});

// // 404
// app.use("*", (req, res) => {
//   res.status(404).json({ success: false, message: "API route not found" });
// });

// Error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// DB connect + start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: false,
      maxPoolSize: 10,
    });
    console.log("MongoDB connected");

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();