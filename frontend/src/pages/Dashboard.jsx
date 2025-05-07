import React from "react";

import TypingresultStore from "../store/TypingResultStore.js";

const Dashboard = () => {
  const typingResult = TypingresultStore((state) => state.typingResult);

  console.log(typingResult);

  return <div></div>;
};

export default Dashboard;
