import { Card, CardHeader, CardBody, Stack, Skeleton } from "@chakra-ui/react";

const QuestionLoader = () => (
  <Card
    height="600px"
    overflow="hidden"
    variant="outline"
    marginRight={5}
    marginBottom={5}
  >
    <CardHeader>
      <Skeleton height="18px" width="60px" />
      <Skeleton mt="20" mb="10" height="40px" width="80%" />
    </CardHeader>
    <CardBody>
      <Stack>
        <Skeleton height="30px" width="300px" />
        <Skeleton height="30px" width="98%" />
        <Skeleton height="30px" width="98%" />
        <Skeleton height="30px" width="98%" />
        <Skeleton height="30px" width="98%" />
      </Stack>
      <Stack>
        <Skeleton mt="20" height="30px" width="100px" />
        <Skeleton mb="24" height="20px" width="100px" />
      </Stack>
    </CardBody>
  </Card>
);

export default QuestionLoader;
