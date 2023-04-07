import {
  useMediaQuery,
  Stat,
  StatNumber,
  StatHelpText,
  Box,
  Progress,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useRealmContext } from "../context/RealmContext";
import { useUserContext } from "../context/UserContext";
import UserDetail from "./UserDetail";

const UserNav = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const { user } = useRealmContext();
  const { answeredCount } = useUserContext();

  if (!user) return;

  const total = 50;

  return (
    <Box ml={isLargerThan800 && 2}>
      <Stat>
        {isLargerThan800 && (
          <>
            <StatNumber>
              {answeredCount}/{total}
            </StatNumber>
            <CircularProgress
              mt={4}
              value={(answeredCount / total) * 100}
              color="green.400"
            >
              <CircularProgressLabel>
                {Math.round((answeredCount / total) * 100)}%
              </CircularProgressLabel>
            </CircularProgress>
          </>
        )}
        <Progress
          mt={isLargerThan800 && 4}
          mb={!isLargerThan800 && 2}
          colorScheme="green"
          size="sm"
          value={(answeredCount / total) * 100}
        />
        {isLargerThan800 && <StatHelpText>Progress</StatHelpText>}
      </Stat>
      {isLargerThan800 && <UserDetail />}
    </Box>
  );
};

export default UserNav;
