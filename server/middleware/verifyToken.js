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
    // Check role field stored in DB (and encoded in the JWT).
    // Transitional fallback: also allow the known admin emails until all
    // admin accounts have role:"admin" set in the database.
    const ADMIN_EMAIL_FALLBACK = [
      "vickyyadav5383@gmail.com",
      "aniketkumar704216@gmail.com",
      "beautifulmolds@gmail.com",
    ];
    if (
      req.user.role === "admin" ||
      ADMIN_EMAIL_FALLBACK.includes(req.user.email)
    ) {
      next();
    } else {
      return res.status(403).json({ success: false, message: "Admin access only!" });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAdmin };
