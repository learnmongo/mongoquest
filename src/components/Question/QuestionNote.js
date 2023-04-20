import React from "react";
import { Textarea, Flex, Button, useMediaQuery } from "@chakra-ui/react";
import { useUserContext } from "../../context/UserContext";
import { useQuestionContext } from "../../context/QuestionContext";
import { useUser } from "../../hooks/useUser";

const QuestionNote = () => {
  const { savedQuestions } = useUserContext();
  const { question } = useQuestionContext();

  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const { isLoading: isUserDataLoading, saveNote } = useUser();
  const [currentNote, setCurrentNote] = React.useState();

  const note = React.useMemo(() => {
    if (!question) return null;

    const savedNote = savedQuestions?.filter(
      (note) => note.id.$oid === question._id.toString()
    );
    return savedNote[0]?.note;
  }, [question, savedQuestions]);

  React.useEffect(() => {
    setCurrentNote(note ?? undefined);
  }, [question._id, note]);

  const handleNoteChange = React.useCallback((e) => {
    let inputValue = e.target.value;
    setCurrentNote(inputValue);
  }, []);

  return (
    <>
      <Textarea
        value={currentNote ?? note}
        onChange={handleNoteChange}
        placeholder="Write any notes here ..."
        size="sm"
        height={isLargerThan800 ? 150 : 50}
        maxLength={500}
      />
      <Flex mt={2} justifyContent="right">
        <Button
          colorScheme="green"
          size="sm"
          isLoading={isUserDataLoading}
          isDisabled={currentNote === note ? true : undefined}
          onClick={async () => await saveNote(question._id, currentNote)}
        >
          Save
        </Button>
      </Flex>
    </>
  );
};

export default QuestionNote;
