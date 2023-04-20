import React from "react";
import { useAggregate } from "../hooks/useAggregate";
import { useUserContext } from "./UserContext";

const QuestionContext = React.createContext({ question: null });

export function QuestionContextProvider({ children }) {
  const { answeredQuestions } = useUserContext();

  const [currentLevel, setCurrentLevel] = React.useState(1);

  const levelStage = React.useMemo(
    () =>
      Number.isNaN(Number(currentLevel))
        ? { $match: { level: { $in: [1, 2, 3] } } }
        : { $match: { level: Number(currentLevel) } },
    [currentLevel]
  );

  const pipeline = [
    // stage to hide answered questions
    {
      $match: { _id: { $nin: answeredQuestions } },
    },
    {
      ...levelStage,
    },
    // radomize results
    { $sample: { size: 3 } },
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
      value={{
        isLoadingQuestion,
        question,
        isAnswered,
        getNextQuestion,
        currentLevel,
        setCurrentLevel,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export const useQuestionContext = () => React.useContext(QuestionContext);
