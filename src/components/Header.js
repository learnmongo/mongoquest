import { Box, Heading, Text } from "@chakra-ui/react";

const Header = (user = {}) => (
  <Box mb={2}>
    <Heading fontWeight={100}>MongoQuest</Heading>
    <Text fontSize="sm" fontWeight={300}>
      Test your skills in a quest to anwser interview questions about MongoDB!
    </Text>
  </Box>
);

export default Header;
