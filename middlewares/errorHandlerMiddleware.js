import { ErrorHandler } from "../utils/errorHandler.js";

//Middleware for handle error .......
export const errorHandlerMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({ success: false, error: err.message });
};

// handling UncaughtError Rejection here.........
export const handleUncaughtError = () => {
  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
    console.log("shutting down server bcz of uncaughtException");
  });
};
