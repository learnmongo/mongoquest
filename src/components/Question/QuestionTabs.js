import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import QuestionNote from "./QuestionNote";
import RawQuestion from "./RawQuestion";

const QuestionTabs = ({ shortResponse }) => (
  <Tabs size="md">
    <TabList>
      <Tab>Notes</Tab>
      <Tab>Response</Tab>
      <Tab>Document</Tab>
    </TabList>
    <TabPanels>
      <TabPanel p={1}>
        <QuestionNote />
      </TabPanel>
      <TabPanel height="180px" overflow="auto">
        <Text>{shortResponse}</Text>
      </TabPanel>
      <TabPanel>
        <RawQuestion />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default QuestionTabs;
