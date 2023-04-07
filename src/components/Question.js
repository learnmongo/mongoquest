import React from "react";
import {
  Heading,
  Text,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatNumber,
  StatHelpText,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Center,
} from "@chakra-ui/react";
import { useUrl } from "../hooks/useUrl";
import QuestionNote from "./QuestionNote";
import { useRealmContext } from "../context/RealmContext";
import RawQuestion from "./RawQuestion";
import { useQuestionContext } from "../context/QuestionContext";
import QuestionLoader from "./QuestionLoader";

const getColor = (level) =>
  level === 1 ? "green" : level === 2 ? "purple" : undefined;

const QuestionDisplay = () => {
  const { question } = useQuestionContext();

  const {
    _id,
    question: questionText,
    level,
    response: {
      short: shortResponse,
      reference: { chapter, section },
    },
  } = question;

  const { updateQuestionUrl } = useUrl();
  const { user } = useRealmContext();

  const getSavedNote = () => {
    const savedQuestions = user.customData?.questions?.saved;
    const savedNote = savedQuestions?.filter(
      (note) => note.id.$oid === _id.toString()
    );
    return savedNote[0]?.note;
  };

  React.useEffect(() => {
    updateQuestionUrl(_id.toString());
  }, [_id, updateQuestionUrl]);

  return (
    <Card
      height="600px"
      overflow="hidden"
      variant="outline"
      marginRight={5}
      marginBottom={5}
    >
      <CardHeader>
        <Badge mb="5" colorScheme={getColor(level)}>
          LEVEL {level}
        </Badge>
        <Flex height="125px">
          <Center>
            <Heading as="h3" size="lg" fontWeight={300}>
              {questionText}
            </Heading>
          </Center>
        </Flex>
      </CardHeader>
      <CardBody>
        <Tabs size="md" height="250px">
          <TabList>
            <Tab>My Notes</Tab>
            <Tab>Response</Tab>
            <Tab>Document</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <QuestionNote note={getSavedNote()} />
            </TabPanel>
            <TabPanel>
              <Text>{shortResponse}</Text>
            </TabPanel>
            <TabPanel>
              <RawQuestion />
            </TabPanel>
          </TabPanels>
        </Tabs>
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
