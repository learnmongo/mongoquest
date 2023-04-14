import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { FaArrowCircleRight, FaCheckCircle } from "react-icons/fa";
import { useUser } from "../hooks/useUser";
import { useQuestionContext } from "../context/QuestionContext";
import { useUserContext } from "../context/UserContext";

const QuestionNav = () => {
  const { setQuestionStatus } = useUserContext();
  const { isLoadingQuestion, question, isAnswered, getNextQuestion } =
    useQuestionContext();
  const { isLoading: isLoadingUserData } = useUser();

  const [hasAnswered, setHasAnswered] = React.useState();

  React.useEffect(() => setHasAnswered(isAnswered), [isAnswered]);

  if (!question) return null;

  return (
    <Flex justifyContent="right" mr={6}>
      <Button
        isLoading={isLoadingUserData}
        colorScheme="green"
        isDisabled={hasAnswered}
        mr={4}
        onClick={() => {
          setHasAnswered(true);
          setQuestionStatus(question._id);
        }}
      >
        {hasAnswered ? <FaCheckCircle /> : "Got It!"}
      </Button>
      <Button
        isLoading={isLoadingQuestion}
        colorScheme="blue"
        loadingText="Loading Quest"
        spinnerPlacement="end"
        rightIcon={!isLoadingQuestion && <FaArrowCircleRight />}
        onClick={getNextQuestion}
      >
        Next Question
      </Button>
    </Flex>
  );
};

export default QuestionNav;
