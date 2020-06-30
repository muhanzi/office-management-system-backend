const jwt = require("jsonwebtoken");
const secretKey = require("../privateKey.json");

exports.verifyAuth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decodedPayload = jwt.verify(
      token,
      secretKey.privateKey.JWT_SECRET_KEY
    ); // verify()  --> returns the decoded payload data that was used to form the encoded token
    next(); // pass control to the next matching function of the route/path  // from left to right
  } catch (error) {
    // if we are unable to verify the token
    res.status(401).send("unauthorized");
  }
};
