const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Authentication Required" });

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY ?? "");
    const user = await UserModel.findById(decodedToken.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error on authenticte", error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = { authenticate };
