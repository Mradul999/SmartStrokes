import Subscription from "../models/Subscription.js";

//creating a new subscriptin for the user for any of the plan he choses
export const createSubscription = async (req, res) => {
  try {
    console.log("req.body=>", req.body);
    const { orderId, amount, currency, planId } = req.body;

    const userId = req.user.id;

    //checking for duplicate subscription
    const existingSubscription = await Subscription.findOne({ orderId });

    if (existingSubscription)
      return res
        .status(400)
        .json({ message: "user is already subscribed to this plan" });

    //creating start and end date

    const startDate = new Date();
    const endDate = new Date(startDate);

    //setting up the plan limit for example base plan have a limit of 10 calls per day etc
    const planLimit = planId * 10;

    // setting endDate 1monthplus to startDate
    endDate.setMonth(endDate.getMonth() + 1);
    // creating new subcription
    const newSubscription = new Subscription({
      userId,
      orderId,
      amount,
      currency,
      startDate,
      endDate,
      planId,
      planLimit,
    });

    //saving to db
    await newSubscription.save();
    res.status(200).json({ message: "subscription created successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while creating subscription", error });
  }
};

// Check and update expired subscriptions
export const checkAndUpdateExpiredSubscriptions = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    // Find active subscriptions that have expired
    const expiredSubscriptions = await Subscription.find({
      userId,
      status: "active",
      endDate: { $lt: now },
    });

    if (expiredSubscriptions.length === 0) {
      return res.status(200).json({
        message: "No expired subscriptions found",
        updatedCount: 0,
      });
    }

    // Update all expired subscriptions to 'expired' status
    const updateResult = await Subscription.updateMany(
      {
        userId,
        status: "active",
        endDate: { $lt: now },
      },
      {
        $set: { status: "expired" },
      }
    );

    return res.status(200).json({
      message: "Expired subscriptions updated successfully",
      updatedCount: updateResult.modifiedCount,
      expiredSubscriptions: expiredSubscriptions.map((sub) => ({
        planId: sub.planId,
        startDate: sub.startDate,
        endDate: sub.endDate,
      })),
    });
  } catch (error) {
    console.error("Error checking expired subscriptions:", error);
    return res.status(500).json({
      message: "Error while checking expired subscriptions",
      error: error.message,
    });
  }
};

// getting the current subscription of the user
export const getMySubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    const subscription = await Subscription.findOne({
      userId,
      status: "active",
    });

    if (!subscription) {
      return res.status(404).json({ message: "No active subscription found." });
    }

    // Check if subscription has expired
    if (now > subscription.endDate) {
      // Update subscription status to expired
      subscription.status = "expired";
      await subscription.save();

      return res.status(404).json({
        message: "Subscription has expired.",
        expiredAt: subscription.endDate,
      });
    }

    return res.status(200).json({
      planId: subscription.planId,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      daysRemaining: Math.ceil(
        (subscription.endDate - now) / (1000 * 60 * 60 * 24)
      ),
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const validateDailyUsage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    // Find active subscription
    const subscription = await Subscription.findOne({
      userId,
      status: "active",
    });

    if (!subscription) {
      return res.status(404).json({
        message:
          "No active subscription found. Please subscribe to a plan first.",
      });
    }

    // Check expiry
    if (now > subscription.endDate) {
      subscription.status = "expired";
      await subscription.save();

      return res.status(403).json({
        message: "Subscription has expired. Please renew your subscription.",
        expiredAt: subscription.endDate,
      });
    }

    // Reset daily usage if new day
    const lastResetDate = new Date(subscription.lastResetTime);
    const isNewDay =
      now.getDate() !== lastResetDate.getDate() ||
      now.getMonth() !== lastResetDate.getMonth() ||
      now.getFullYear() !== lastResetDate.getFullYear();

    if (isNewDay) {
      subscription.dailyUsage = 0;
      subscription.lastResetTime = now;
    }

    // Check daily limit
    if (subscription.dailyUsage >= subscription.planLimit) {
      return res.status(429).json({
        message:
          "Daily limit exceeded. You have reached your daily usage limit.",
        dailyUsage: subscription.dailyUsage,
        planLimit: subscription.planLimit,
        remainingCalls: 0,
      });
    }

    // Attach subscription so textGenerate can increment later
    req.subscription = subscription;

    next();
  } catch (error) {
    console.error("Error validating daily usage:", error);
    return res.status(500).json({
      message: "Server error while validating daily usage",
      error: error.message,
    });
  }
};
