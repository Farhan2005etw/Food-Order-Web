import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { listOrders, placeOrder, updateStatus, userOrder, getSingleOrder } from "../controller/orderController.js";

const orderRouter = express.Router()

orderRouter.post('/place-order', authMiddleware, placeOrder);
orderRouter.post('/userorders', authMiddleware, userOrder)
orderRouter.get('/list', listOrders)
orderRouter.post('/status', updateStatus)
orderRouter.get("/:orderId", getSingleOrder); // Add this line

export default orderRouter;