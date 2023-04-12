import React from "react";
import { Textarea, Flex, Button } from "@chakra-ui/react";
import { useRealmContext } from "../../context/RealmContext";
import { useQuestionContext } from "../../context/QuestionContext";
import { useUser } from "../../hooks/useUser";

const QuestionNote = () => {
  const { user } = useRealmContext();
  const { question } = useQuestionContext();

  const { isLoading: isUserDataLoading, saveNote } = useUser();
  const [currentNote, setCurrentNote] = React.useState();

  const note = React.useMemo(() => {
    if (!question) return null;
    const savedQuestions = user.customData?.questions?.saved;
    const savedNote = savedQuestions?.filter(
      (note) => note.id.$oid === question._id.toString()
    );
    return savedNote[0]?.note;
  }, [question, user.customData?.questions?.saved]);

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
        height={150}
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
