import { useMediaQuery, Grid, GridItem, Flex, Text } from "@chakra-ui/react";
import { useRealmContext } from "../context/RealmContext";

import Header from "./Header";
import UserNav from "./UserNav";
import LoggedOut from "./LoggedOut";
import LoggedIn from "./LoggedIn";
import { UserContextProvider } from "../context/UserContext";

const MongoQuest = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const { user } = useRealmContext();

  const columns = isLargerThan800 && user ? 4 : 1;

  const userNav = (
    <GridItem h={isLargerThan800 && "60dvh"} colSpan={1}>
      <UserNav />
    </GridItem>
  );

  return (
    <Grid
      h="100px"
      templateColumns={`repeat(${columns}, 1fr)`}
      gap={2}
      m={isLargerThan800 ? 6 : 2}
    >
      <GridItem colSpan={columns}>
        <Header />
      </GridItem>
      {!user && <LoggedOut />}
      {user && (
        <UserContextProvider>
          {!isLargerThan800 && <GridItem colSpan={1}>{userNav}</GridItem>}
          <GridItem colSpan={columns - 1}>
            <LoggedIn />
          </GridItem>
          {isLargerThan800 && userNav}
        </UserContextProvider>
      )}
      <GridItem mt={10} h="50px" colSpan={columns}>
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
