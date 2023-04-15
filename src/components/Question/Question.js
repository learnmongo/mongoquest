import React from "react";
import { useUrl } from "../../hooks/useUrl";
import { useQuestionContext } from "../../context/QuestionContext";
import {
  Heading,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatNumber,
  StatHelpText,
  Flex,
  Center,
} from "@chakra-ui/react";
import QuestionLoader from "./QuestionLoader";
import QuestionTabs from "./QuestionTabs";

const getLevelColor = (level) =>
  level === 1 ? "green" : level === 2 ? "purple" : undefined;

const QuestionDisplay = () => {
  const { question } = useQuestionContext();

  // destructure question document
  const {
    question: questionText,
    response: {
      short: shortResponse,
      reference: { chapter, section },
    },
  } = question;

  /*
  const { updateQuestionUrl } = useUrl();

  React.useEffect(() => {
    updateQuestionUrl(question._id.toString());
  }, [question._id, updateQuestionUrl]);
  */

  return (
    <Card
      variant="outline"
      height="65dvh"
      minHeight="500px"
      maxHeight="700px"
      mb={5}
    >
      <CardHeader>
        <Badge mb="5" colorScheme={getLevelColor(question.level)}>
          LEVEL {question.level}
        </Badge>
        <Flex height="10dvh">
          <Center>
            <Heading as="h3" size="lg" fontWeight={300}>
              {questionText}
            </Heading>
          </Center>
        </Flex>
      </CardHeader>
      <CardBody>
        <QuestionTabs shortResponse={shortResponse} />
        <Stat height="60px">
          <StatNumber fontWeight={300}>Chapter {chapter}</StatNumber>
          <StatHelpText>{section}</StatHelpText>
        </Stat>
      </CardBody>
    </Card>
  );
};

const Question = () => {
  const { isLoadingQuestion, question } = useQuestionContext();

  if (isLoadingQuestion || !question) return <QuestionLoader />;

  return <QuestionDisplay />;
};

export default Question;
