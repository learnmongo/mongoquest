import {
  Stat,
  StatNumber,
  StatHelpText,
  Progress,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useRealmContext } from "../context/RealmContext";
import UserDetail from "./UserDetail";

const RightNav = () => {
  const { user } = useRealmContext();

  if (!user) return;

  const total = 50;
  const answeredCount = user.customData?.questions?.answered?.length ?? 0;

  return (
    <>
      <Stat>
        <StatNumber>
          {answeredCount}/{total}{" "}
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
        <Progress
          mt={4}
          mr={4}
          colorScheme="green"
          size="sm"
          value={(answeredCount / total) * 100}
        />
        <StatHelpText>Progress</StatHelpText>
      </Stat>
      <UserDetail />
    </>
  );
};

export default RightNav;
