import { Stack, Text, Button } from "@chakra-ui/react";
import { RiSwordLine } from "react-icons/ri";

import { useRealmContext } from "../context/RealmContext";

const LoggedOut = () => {
  const { loginUser } = useRealmContext();
  return (
    <Stack height="600px" width="95dvw" spacing={5}>
      <Text fontSize="xl" fontWeight={200}>
        Do you wish to begin your quest?
      </Text>
      <Button
        size="lg"
        colorScheme="green"
        leftIcon={<RiSwordLine />}
        rightIcon={<RiSwordLine />}
        onClick={loginUser}
      >
        Begin
      </Button>
    </Stack>
  );
};

export default LoggedOut;
