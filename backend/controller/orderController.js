import { response } from "express";
import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import  sendNotification  from "../utils/sendNotification.js";


//PLacing user order for frontend
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    if (!items || !amount || !address) {
      return res.json({ success: false, message: "Missing Order Details" });
    }

    const newOrder = new orderModel({
      userId: req.userId,
      items,
      amount,
      address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cart: {} });
    const adminFcmToken = "cFf8zUTIpbpaNP6SVAj_ok:APA91bHfI3x1y0XxXFeA2xLj0Y93GxdQJNAs9yppH0AbkjCprQK0K2Ngh29Ymr_44UD7BcHAssGdMwgvbA2Kfqh_JH4GI9Vm_oz8UPPEwXDYGa_2V9EOu1s"

    // ✅ Send FCM Notification to Admin
    await sendNotification(
      adminFcmToken,
      "🛒 New Order Received",
      `Order from user ${address.firstName} - Amount ₹${amount}`
    );

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

//Listing Order for Admin Panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success: true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({succes:false, message:"Error"})
       
  }
}

// Get single order for bill printing
const getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.json({ success: false, message: "Order ID is required" });
    }

    const order = await orderModel.findById(orderId);
    
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }
    
    res.json({ success: true, data: order });
  } catch (error) {
    console.log("GET SINGLE ORDER ERROR:", error);
    res.json({ success: false, message: "Error fetching order details" });
  }
}

// api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
    res.json({success:true, message:"Status updated"})    
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})        
  }
}

export { placeOrder, userOrder, updateStatus, listOrders, getSingleOrder };