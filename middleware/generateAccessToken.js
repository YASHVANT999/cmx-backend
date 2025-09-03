const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  try {
    return jwt.sign({user} , process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "12h",
    });
  } catch (error) {
    console.log("generateAccessToken", error);
    throw new Error("Error generating access token");
  }
}

module.exports = generateAccessToken;
