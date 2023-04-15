import { Box, Icon, Link, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useRealmContext } from "../context/RealmContext";
import { useUserContext } from "../context/UserContext";
import { useMongoQuery } from "../hooks/useMongoQuery";
import { TbNotes } from "react-icons/tb";

const SavedQuestionsList = ({ savedQuestionIds }) => {
  const { find } = useMongoQuery({
    collectionName: "questions",
  });

  const [savedQuesionList, setSavedQuesionList] = React.useState();

  React.useEffect(() => {
    (async () => {
      const questions = await find(
        { _id: { $in: savedQuestionIds } },
        { projection: { question: 1 } }
      );
      setSavedQuesionList(questions);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedQuestionIds]);

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
  const { user } = useRealmContext();
  const { savedQuestionIds } = useUserContext();

  if (!user || !savedQuestionIds.length) return;

  return (
    <Stack mt={5}>
      <Text fontWeight={600}>Saved Questions</Text>
      <SavedQuestionsList savedQuestionIds={savedQuestionIds} />
    </Stack>
  );
};

export default SavedQuestions;
