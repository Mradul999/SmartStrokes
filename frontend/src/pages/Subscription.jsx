import React from "react";
import axios from "axios";

const plans = [
  {
    name: "Basic",
    price: 99,
    features: ["10 Tests per month", "Basic Analytics", "Community "],
    highlight: false,
  },
  {
    name: "Pro",
    price: 299,
    features: [
      "Unlimited Tests",
      "Advanced Analytics",
      "Priority Support",
      "Download Reports",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: 599,
    features: [
      "All Pro Features",
      "1-on-1 Mentorship",
      "Early Access to Features",
      "Custom Test Builder",
    ],
    highlight: false,
  },
];
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Subscription = () => {
  const handleCheckout = async (amount) => {
    // console.log(price);
    // logic to show razorpay payment window and making call to backend

    try {
      const response = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!response) {
        alert("Razorpay faild to load");
        return;
      }

      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/razorpay/createorder`,
        {
          amount,
        }
      );

      console.log(data.data.order.id);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
        amount: data.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Mradul Verma",
        description: "Pro subscription",
        image: "https://example.com/your_logo",
        order_id: data.data.order.id,
        handler: async function (response) {
          console.log("verification response ", response);
          const paymentResult = {
            order_id: data.data.order.id,
            payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          console.log("payment resutl", paymentResult);

          const verify = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/razorpay/verify`,
            paymentResult
          );

          if (verify.status === 200) {
            alert("payment verified successfully");
          } else {
            alert("payment verification error");
          }
        },
        prefill: {
          name: "Mradul verma",
          email: "demorgans007@gmail.com",
          contact: "9520090880",
        },

        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#18191A] py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          Upgrade to unlock advanced features and level up your performance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-xl shadow-lg border p-6 transition-all duration-300
                ${
                  plan.highlight
                    ? "bg-blue-600 text-white border-blue-500 scale-105"
                    : "bg-white dark:bg-[#242526] border-gray-200 dark:border-[#3A3B3C] text-gray-800 dark:text-gray-200"
                }`}
            >
              <h3 className="text-xl font-semibold mb-3">{plan.name}</h3>
              <div className="text-3xl font-bold mb-4">₹{plan.price}/mo</div>
              <ul className="text-sm space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-blue-500 dark:text-blue-400">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  handleCheckout(plan.price);
                }}
                className={`w-full py-2 rounded-lg font-medium transition 
                  ${
                    plan.highlight
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
