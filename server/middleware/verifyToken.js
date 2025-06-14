const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  console.log("🧾 Cookie Token:", token); 

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log("✅ Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Token is not valid!" });
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const adminEmails = ["vickyyadav5383@gmail.com"]; // ✅ List of allowed admin emails
     console.log("Checking email:", req.user?.email);
    if (adminEmails.includes(req.user.email)) {
       console.log("✅ Verified admin:", req.user.email);
      next();
    } else {
       console.log("⛔ Not authorized:", req.user?.email);
      return res.status(403).json({ success: false, message: "Admin access only!" });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAdmin };
