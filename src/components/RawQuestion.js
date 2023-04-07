import { useQuestionContext } from "../context/QuestionContext";

const RawQuestion = () => {
  const { question } = useQuestionContext();
  return (
    <div
      style={{
        padding: 6,
        backgroundColor: "#EFEFEF",
        maxHeight: 180,
        overflow: "auto",
      }}
    >
      <pre style={{ fontSize: 10, whiteSpace: "pre-wrap" }}>
        {JSON.stringify(question, null, 1)}
      </pre>
    </div>
  );
};

export default RawQuestion;
