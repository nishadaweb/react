const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("heeeeeeeeeeeeaaaai", req.headers.authorization);

    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      console.log("haaaai", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("weeee");

      //get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized , no token");
  }
});
const adminprotect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("heeeeeeeeeeeeaaaai", req.headers.authorization);

    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      console.log("haaaai", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("weeee");

      //get admin from the token
      req.admin = await Admin.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!admintoken) {
    res.status(401);
    throw new Error("Not Authorized , no token");
  }
});

module.exports = {protect,adminprotect};
