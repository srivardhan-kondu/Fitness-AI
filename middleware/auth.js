const jwt = require("jsonwebtoken");
const JWT_SECRET = "22eg106b45@anurag.edu.in"; // Keep this secure

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token"); // Read token from request headers

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId; // Attach user ID to request
    next(); // Move to the next middleware
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
