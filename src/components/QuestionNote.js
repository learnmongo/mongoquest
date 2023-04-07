import React from "react";
import { useQuestionContext } from "../context/QuestionContext";
import { useUser } from "../hooks/useUser";
import { Textarea, Flex, Button } from "@chakra-ui/react";

const QuestionNote = ({ note = "" }) => {
  const {
    question: { _id },
  } = useQuestionContext();

  const { isLoading: isUserDataLoading, saveNote } = useUser();
  const [currentNote, setCurrentNote] = React.useState();

  React.useEffect(() => {
    setCurrentNote(note ?? undefined);
  }, [_id, note]);

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
        height={150}
        maxLength={500}
      />
      <Flex mt={2} justifyContent="right">
        <Button
          colorScheme="green"
          size="sm"
          isLoading={isUserDataLoading}
          isDisabled={currentNote === note ? true : undefined}
          onClick={async () => await saveNote(_id, currentNote)}
        >
          Save
        </Button>
      </Flex>
    </>
  );
};

export default QuestionNote;
