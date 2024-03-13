// Import the necessary modules here

import { createNewOrderRepo } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

//function to create new order.....
export const createNewOrder = async (req, res, next) => {
  try {
    // const orderData = req.body;
    // const newOrder = await createNewOrderRepo(orderData);
    // res.status(201).json({
    //   success: true,
    //   order: newOrder,
    // });
    const userId = req.user._id;
    console.log("this is req.user._id", req.user._id);
    const data = req.body;
    const orderdetails = await createNewOrderRepo(data, userId);

    res.status(201).send(orderdetails);
  } catch (error) {
    next(new ErrorHandler(500, "Error creating a new Order", error.message));
  }
};
