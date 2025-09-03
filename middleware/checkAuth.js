const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    try {
      const decoded = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.ACCESS_TOKEN_SECRET
      );
      req.user = decoded;
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      res.status(401).json({
        success: false,
        message: "Unauthorized!",
        data: [],
        error: error.message,
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized!",
      data: [],
      error: "Token not provided",
    });
  }
};

module.exports = authToken;
