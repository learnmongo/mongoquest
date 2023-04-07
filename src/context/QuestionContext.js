import React from "react";
import { useAggregate } from "../hooks/useAggregate";
import { useRealmContext } from "./RealmContext";

const QuestionContext = React.createContext({ question: null });

export function QuestionContextProvider({ children }) {
  const user = useRealmContext();

  const answeredQuestions = user.customData?.questions?.answered ?? [];

  const pipeline = [
    // stage to hide answered questions
    {
      $match: { _id: { $nin: answeredQuestions } },
    },
    {
      $sample: { size: 3 },
    },
    { $limit: 1 },
  ];

  const {
    isLoading: isLoadingQuestion,
    firstResult: question,
    getResults: getNextQuestion,
  } = useAggregate({
    collectionName: "questions",
    pipeline,
  });

  return (
    <QuestionContext.Provider
      value={{ isLoadingQuestion, question, getNextQuestion }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export const useQuestionContext = () => React.useContext(QuestionContext);
