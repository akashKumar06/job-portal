import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.middleware.js";
import User from "../models/user.model.js";

async function verifyJWT(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return next(new ErrorHandler("User is not logged in.", 400));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      return next(new ErrorHandler("Invalid  user", 400));
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export { verifyJWT };
