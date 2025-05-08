import React from "react";
import Header from "../components/Header";
import TypingBox from "../components/TypingBox";
import Footer from "../components/Footer";
import authStore from "../store/store.js";

const Home = () => {
  const currentUser = authStore((state) => state.currentUser);
  console.log("current user is ", currentUser);
  return (
    <div>
      <TypingBox />
    </div>
  );
};

export default Home;
