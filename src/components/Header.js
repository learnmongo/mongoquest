import { useMediaQuery, Box, Heading, Text } from "@chakra-ui/react";

const Header = (user = {}) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  return (
    <Box mb={isLargerThan800 && 2}>
      <Heading fontWeight={100}>MongoQuest</Heading>

      <Text fontSize="sm" fontWeight={300}>
        Test your skills in a quest to anwser interview questions about MongoDB!
      </Text>
    </Box>
  );
};

export default Header;
