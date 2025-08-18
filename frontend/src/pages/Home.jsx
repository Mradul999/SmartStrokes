import React from "react";
import TypingBox from "../components/TypingBox";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    try {
      const getSubscriptionStatus = async (req, res) => {
        const response = await axios.post(
          "http://localhost:3001/api/subscription/check-expired",
          {},
          { withCredentials: true }
        );

        console.log(response.data);
      };

      getSubscriptionStatus();
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div>
      <TypingBox />
    </div>
  );
};

export default Home;
