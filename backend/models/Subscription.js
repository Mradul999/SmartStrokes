import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },

    amount: {
      type: Number,
      required: true,
    },
    dailyUsage: {
      type: Number,
      default: 0,
    },
    planLimit: {
      type: Number,
      required: true,
    },
    lastResetTime: {
      type: Date,
      default: Date.now(),
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    planId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
