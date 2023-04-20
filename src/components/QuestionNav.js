import React from "react";
import { Button, Flex, Select } from "@chakra-ui/react";
import { FaArrowCircleRight, FaCheckCircle } from "react-icons/fa";
import { useUser } from "../hooks/useUser";
import { useQuestionContext } from "../context/QuestionContext";
import { useUserContext } from "../context/UserContext";

const QuestionNav = () => {
  const { setQuestionStatus } = useUserContext();
  const {
    isLoadingQuestion,
    question,
    isAnswered,
    getNextQuestion,
    setCurrentLevel,
  } = useQuestionContext();

  const { isLoading: isLoadingUserData } = useUser();

  const [hasAnswered, setHasAnswered] = React.useState();

  React.useEffect(() => setHasAnswered(isAnswered), [isAnswered]);
  const handleLevelChange = React.useCallback(
    (e) => {
      setCurrentLevel(e?.target?.value);
    },
    [setCurrentLevel]
  );

  if (!question) return null;

  return (
    <Flex>
      <Flex width="35%">
        <Select width="115px" onChange={handleLevelChange}>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="random">Random</option>
        </Select>
      </Flex>
      <Flex width="65%" justifyContent="right" mr={1}>
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
          loadingText="Loading"
          spinnerPlacement="end"
          rightIcon={!isLoadingQuestion && <FaArrowCircleRight />}
          onClick={getNextQuestion}
          width="110px"
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default QuestionNav;
