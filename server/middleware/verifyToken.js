const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Token is not valid!" });
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const adminEmails = ["vickyyadav5383@gmail.com",]; // ✅ List of allowed admin emails
    if (adminEmails.includes(req.user.email)) {
      next();
    } else {
      return res.status(403).json({ success: false, message: "Admin access only!" });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAdmin };
