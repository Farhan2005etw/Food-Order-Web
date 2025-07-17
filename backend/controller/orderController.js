import { response } from "express";
import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//PLacing user order for frontend
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    if (!items || !amount || !address) {
      return res.json({ success: false, message: "Missing Order Details" });
    }

    // const orderItems = Object.values(items); // because now items is an object with full customPizza data

    const newOrder = new orderModel({
      userId: req.userId,
      items, // directly use items
      amount,
      address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cart: {} });

    res.json({
      success: true,
      message: "Order Placed Successfully with Cash on Delivery",
    });
  } catch (error) {
    console.log("ORDER ERROR:", error);
    return res.json({
      success: false,
      message: "Error While Placing Order",
    });
  }
};
//user orders for frontend
const userOrder = async (req, res)  => {
  try {
    const orders = await orderModel.find({userId:req.userId});
    res.json({success:true, data: orders})

  } catch (error) {
    console.log(error);
    res.json({success:false, message: "Error"})        
  }

}

export { placeOrder, userOrder };
