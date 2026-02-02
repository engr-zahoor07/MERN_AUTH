const jwt = require("jsonwebtoken");

const JWT_AUTH = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) res.status(403).json({ message: "JWT not provided" });
    console.log(token);
    const decodedData = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    console.log(decodedData);
    req.decodedData = decodedData;
    next();
  } catch (error) {
    res.status(404).json({ message: "Invalid Token" });
  }
};

module.exports = JWT_AUTH;
