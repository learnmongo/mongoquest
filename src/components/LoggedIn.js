import React from "react";

import { QuestionContextProvider } from "../context/QuestionContext";

import Question from "./Question";
import BottomNav from "./BottomNav";

const LoggedIn = () => {
  return (
    <QuestionContextProvider>
      <Question />
      <BottomNav />
    </QuestionContextProvider>
  );
};

export default LoggedIn;
