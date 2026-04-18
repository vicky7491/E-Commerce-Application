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
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(compression());
app.use(morgan("combined"));


app.use(
  cors({
    origin: process.env.FRONTEND_URL?.split(","),
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
  })
);
app.options('*', cors()); 
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));


// ─── Rate Limiters ────────────────────────────────────────────────────────────

// Strict: brute-force protection for login / register / forgot-password
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,    // Return RateLimit-* headers (RFC 6585)
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Please try again after 15 minutes.",
  },
});

// Generous: normal browsing, product fetches, cart, orders, etc.
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please slow down.",
  },
});


// Routes
app.use("/api/auth", authLimiter, require("./routes/auth/auth-routes"));

app.use("/api/admin/products",generalLimiter, require("./routes/admin/products-routes"));
app.use("/api/admin/orders",generalLimiter, require("./routes/admin/order-routes"));
app.use("/api/admin/bookings", generalLimiter, require("./routes/admin/booking-routes"));
app.use("/api/shop/products", generalLimiter, require("./routes/shop/products-routes"));
app.use("/api/shop/cart", generalLimiter, require("./routes/shop/cart-routes"));
app.use("/api/shop/address", generalLimiter, require("./routes/shop/address-routes"));
app.use("/api/shop/order", generalLimiter, require("./routes/shop/order-routes"));
app.use("/api/shop/search", generalLimiter, require("./routes/shop/search-routes"));
app.use("/api/shop/review", generalLimiter, require("./routes/shop/review-routes"));
app.use("/api/common/feature", generalLimiter, require("./routes/common/feature-routes"));
app.use("/api/bookings", generalLimiter, require("./routes/common/booking-routes"));

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