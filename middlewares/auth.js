// import all important dependencies......
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler.js";
import UserModel from "../src/user/models/user.schema.js";
import dotenv from "dotenv";
dotenv.config();

//authorization middleware to verify the token and get user data...
export const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler(401, "login to access this route!"));
  }
  const decodedData = await jwt.verify(token, process.env.JWT_Secret);
  req.user = await UserModel.findById(decodedData.id);
  next();
};

//authorized for user role only......
export const authByUserRole = (...roles) => {
  return async (req, res, next) => {
    if (roles.includes(req.user.role !== "admin")) {
      return next(
        new ErrorHandler(
          403,
          `Role: ${req.user.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};
