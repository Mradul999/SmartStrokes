import razorpay from "razorpay";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();

const razorpayinstance = new razorpay({
  key_id: process.env.VITE_RAZORPAY_ID,
  key_secret: process.env.VITE_RAZORPAY_SECRET,
});

//function to create the order
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    // console.log("amount from frontend", amount);
    const options = {
      amount: amount * 100,

      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    // console.log("optiosn", options);
    const order = await razorpayinstance.orders.create(options);
    console.log(order);
    res.status(200).json({ message: "order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred creating order", error });
  }
};
//function to verify the payment
export const verifyOrder = async (req, res) => {
  try {
    const { order_id, payment_id, razorpay_signature } = req.body;
    const body = order_id + "|" + payment_id;
    const signature = crypto
      .createHmac("sha256", process.env.VITE_RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthenticated = signature === razorpay_signature;

    if (isAuthenticated) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "payment verification error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errror in payment verification", error });
  }
};
