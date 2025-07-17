import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { placeOrder, userOrder } from "../controller/orderController.js";

const orderRouter = express.Router()

orderRouter.post('/place-order', authMiddleware, placeOrder);
orderRouter.post('/userorders', authMiddleware, userOrder)

export default orderRouter;