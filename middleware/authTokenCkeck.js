const jwt = require("jsonwebtoken");

const authTokenCkeck = (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({
      nodeEnv: process.env.NODE_ENV ?? 'development',
      success: true,
      message: "authorized!!!!",
      // data: decoded,
    });
  } catch (error) {
    console.log("authTokenCkeck");
    res.status(401).json({
      success: false,
      message: "Unauthorized!",
      data: [],
      error: "Token not provided",
    });
  }
};

module.exports = authTokenCkeck;
