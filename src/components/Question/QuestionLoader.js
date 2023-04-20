import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  Skeleton,
  Flex,
  useMediaQuery,
  Heading,
  Center,
} from "@chakra-ui/react";

const QuestionLoader = ({ noQuestions = false }) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Card
      height="65dvh"
      minHeight={isLargerThan800 ? "500px" : "450px"}
      maxHeight="700px"
      overflow="hidden"
      variant="outline"
      mb={5}
    >
      <CardHeader>
        <Skeleton height="18px" width="60px" />
        {noQuestions ? (
          <Flex height="15dvh">
            <Center>
              <Heading>Choose Another Level</Heading>
            </Center>
          </Flex>
        ) : (
          <>
            <Skeleton mt="10" height="30px" width="85%" />
            <Skeleton mt="2" mb="5" height="30px" width="40%" />
          </>
        )}
      </CardHeader>
      <CardBody>
        <Stack>
          <Skeleton height="28px" />
          <Skeleton height="28px" />
          {isLargerThan800 && (
            <>
              <Skeleton height="28px" />
              <Skeleton height="28px" />
              <Skeleton height="28px" />
            </>
          )}
          <Flex justifyContent="right">
            <Skeleton height="30px" width="50px" />
          </Flex>
        </Stack>
        <Stack mt="2">
          <Skeleton mt="6" height="30px" width="100px" />
          <Skeleton mb="24" height="20px" width="100px" />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default QuestionLoader;
