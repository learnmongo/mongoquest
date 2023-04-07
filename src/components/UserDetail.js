import { Button, Flex } from "@chakra-ui/react";
import { useRealmContext } from "../context/RealmContext";

const UserDetail = () => {
  const { user, refreshUser } = useRealmContext();

  if (!user) return;

  return (
    <>
      <small>
        Logged in with anonymous id:
        <pre>{user.id}</pre>
      </small>
      <Flex mt={4}>
        <Button size="xs" onClick={() => refreshUser}>
          Refresh User Data
        </Button>
      </Flex>
    </>
  );
};

export default UserDetail;
