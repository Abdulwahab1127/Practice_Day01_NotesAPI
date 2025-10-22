import jwt from "jsonwebtoken";
import User from "../models/users.js"; // import User model

const protect = async (req, res, next) => {
  let token;

  // Check if token exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token (remove 'Bearer ')
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info (without password) to req.user
      req.user = await User.findById(decoded.id).select("-password");

      next(); // move to next middleware/controller
    } catch (error) {
      console.error("JWT verification failed:", error);
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }

  // If token not found
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }
};
export { protect };