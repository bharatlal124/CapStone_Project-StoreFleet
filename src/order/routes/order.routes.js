import express from "express";
import { createNewOrder } from "../controllers/order.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();

//Routes for creating new order....
router.route("/new").post(auth, createNewOrder);

export default router;
