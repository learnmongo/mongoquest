import React from "react";
import { useAggregate } from "../hooks/useAggregate";
import { useUserContext } from "./UserContext";

const QuestionContext = React.createContext({ question: null });

export function QuestionContextProvider({ children }) {
  const { answeredQuestions } = useUserContext();

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

  const isAnswered = React.useMemo(
    () => answeredQuestions?.some((id) => id.$oid === question?._id.toString()),
    [answeredQuestions, question]
  );

  return (
    <QuestionContext.Provider
      value={{ isLoadingQuestion, question, isAnswered, getNextQuestion }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export const useQuestionContext = () => React.useContext(QuestionContext);
