import { Grid, GridItem, Flex, Text } from "@chakra-ui/react";
import { useRealmContext } from "../context/RealmContext";

import Header from "./Header";
import RightNav from "./RightNav";
import LoggedOut from "./LoggedOut";
import LoggedIn from "./LoggedIn";

const MongoQuest = () => {
  const { user } = useRealmContext();

  return (
    <Grid h="100px" templateColumns="repeat(4, 1fr)" gap={2} padding={4}>
      <GridItem colSpan={3}>
        <Header />
      </GridItem>
      <GridItem colSpan={3}>{user ? <LoggedIn /> : <LoggedOut />}</GridItem>
      <GridItem h="80vh" colSpan={1}>
        <RightNav />
      </GridItem>
      <GridItem h="50px" colSpan={4}>
        <Flex justifyContent="center">
          <Text fontSize="sm" fontWeight={300}>
            MongoQuest 2023
          </Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default MongoQuest;
