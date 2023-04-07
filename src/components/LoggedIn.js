import React from "react";

import { QuestionContextProvider } from "../context/QuestionContext";

import Question from "./Question";
import QuestionNav from "./QuestionNav";

const LoggedIn = () => {
  return (
    <QuestionContextProvider>
      <Question />
      <QuestionNav />
    </QuestionContextProvider>
  );
};

export default LoggedIn;
