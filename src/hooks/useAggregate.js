import React from "react";
import { useRealmContext } from "../context/RealmContext";

export const useAggregate = ({
  databaseName = "mongoquest",
  collectionName,
  pipeline = [],
}) => {
  const { user } = useRealmContext();

  const mongo = user.app.currentUser.mongoClient("mongodb-atlas");
  const collection = mongo.db(databaseName).collection(collectionName);

  const [results, setResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(undefined);

  const getResults = React.useCallback(async () => {
    setIsLoading(true);
    const aggregation = await collection.aggregate(pipeline);
    setResults(aggregation);
    setIsLoading(false);
    return aggregation;
  }, [collection, pipeline]);

  React.useEffect(
    () => {
      const initialResult = async () => {
        await getResults();
        console.log("initialResult");
      };
      // @todo fix double load issue on local?
      initialResult();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    results,
    firstResult: results[0],
    getResults,
    isLoading,
  };
};
