import { Box, Icon, Link, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useUserContext } from "../context/UserContext";
import { useMongoQuery } from "../hooks/useMongoQuery";
import { TbNotes } from "react-icons/tb";

// don't bother to do this for the chapter?
// clean it up later and maybe in appendex?
// add support to the id?
const SavedQuestionsList = ({ savedQuestions }) => {
  const { find } = useMongoQuery({
    collectionName: "questions",
  });

  const [savedQuesionList, setSavedQuesionList] = React.useState();

  React.useEffect(() => {
    (async () => {
      const questions = await find(
        { _id: { $in: savedQuestions } },
        { projection: { question: 1 } }
      );
      setSavedQuesionList(questions);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedQuestions]);

  const questionList = savedQuesionList?.map((q) => (
    <Box>
      <Link href={`/trail/${q._id}`}>
        <Text fontSize="sm" noOfLines={1} color="gray" title={q.question}>
          <Icon as={TbNotes} />
          {q.question}
        </Text>
      </Link>
    </Box>
  ));

  return (
    <VStack align="stretch" maxHeight="250px" overflowY="auto">
      {questionList}
    </VStack>
  );
};

const SavedQuestions = () => {
  const { savedQuestions } = useUserContext();

  if (!savedQuestions.length) return null;

  return (
    <Stack mt={5}>
      <Text fontWeight={600}>Saved Questions</Text>
      <SavedQuestionsList savedQuestions={savedQuestions} />
    </Stack>
  );
};

export default SavedQuestions;
