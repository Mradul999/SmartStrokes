import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const plans = [
  {
    id: 1,
    name: "Basic",
    price: 1,
    features: ["10 AI Tests per Day"],
    highlight: false,
  },
  {
    id: 2,
    name: "Pro",
    price: 2,
    features: ["20 AI Tests per Day"],
    highlight: true,
  },
  {
    id: 3,
    name: "Premium",
    price: 3,
    features: ["30 AI Tests per Day", ,],
    highlight: false,
  },
];

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const Subscription = ({ theme }) => {
  const [activePlanId, setActivePlanId] = useState(null);
  const isDark = theme === "dark";

  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/subscription/mysubscription`,
          { withCredentials: true }
        );
        setActivePlanId(data.planId);
      } catch (error) {
        console.log("No active subscription found.");
      }
    };

    fetchSubscription();
  }, []);

  const handleCheckout = async ({ amount, id }) => {
    setLoading(id);
    try {
      const loaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!loaded) {
        setLoading(false);
        alert("Failed to load Razorpay");
        return;
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/razorpay/createorder`,
        { amount },
        { withCredentials: true }
      );
      setLoading(false);
      // console.log(import.meta.env.VITE_RAZORPAY_ID);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Mradul Verma",
        description: "Pro subscription",
        image: "",
        order_id: data.order.id,
        handler: async function (response) {
          const paymentResult = {
            order_id: data.order.id,
            payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const verify = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/razorpay/verify`,
            paymentResult
          );

          if (verify.status === 200) {
            const createSubscription = await axios.post(
              `${
                import.meta.env.VITE_API_URL
              }/api/subscription/createsubscription`,
              {
                orderId: data.order.id,
                amount: data.order.amount,
                currency: data.order.currency,
                planId: id,
              },
              { withCredentials: true }
            );

            if (createSubscription.status === 200) {
              toast.success("Subscribed successfully");
              setActivePlanId(id);
            }
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "Mradul Verma",
          email: "demorgans007@gmail.com",
          contact: "9520090880",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#FFFFFF",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.log(err);
      alert("An error occurred");
    }
  };

  return (
    <div
      className={`py-32 px-4 transition-colors duration-300 ${
        isDark ? "bg-[#18191A]" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className={`text-3xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          Choose Your Plan
        </h2>
        <p className={`mb-10 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Upgrade to unlock advanced features and level up your performance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`rounded-2xl shadow-md border p-6 transition-all duration-300 ${
                  plan.highlight
                    ? "bg-blue-600 text-white border-blue-500 scale-105"
                    : isDark
                    ? "bg-[#242526] text-gray-200 border-[#3A3B3C]"
                    : "bg-white text-gray-800 border-gray-200"
                }`}
              >
                <h3 className="text-xl font-semibold  mb-3">{plan.name}</h3>
                <div className="text-3xl font-bold mb-4">₹{plan.price}/mo</div>
                <ul className="text-xl font-semibold space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span
                        className={`font-bold ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        ✔
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  disabled={activePlanId === plan.id || loading}
                  onClick={() => {
                    if (activePlanId !== null && activePlanId !== plan.id) {
                      toast.error("You have already subscribed to one plan.");

                      return;
                    }
                    handleCheckout({ amount: plan.price, id: plan.id });
                  }}
                  className={`w-full py-2 rounded-lg font-medium transition duration-200 ${
                    activePlanId === plan.id
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : plan.highlight
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {activePlanId === plan.id
                    ? "Subscribed"
                    : loading === plan.id
                    ? "Loading.."
                    : `Choose ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Toaster reverseOrder={false} />
    </div>
  );
};

export default Subscription;
