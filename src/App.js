import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { RealmContextProvider } from "./context/RealmContext";

import MongoQuest from "./components/MongoQuest";

const App = () => {
  return (
    <ChakraProvider>
      <RealmContextProvider>
        <MongoQuest />
      </RealmContextProvider>
    </ChakraProvider>
  );
};

export default App;
