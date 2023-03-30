import React from "react";
import { useRealm } from "./useRealm";

export const useAggregate = ({
  databaseName = "mongoquest",
  collectionName,
  pipeline = [],
}) => {
  const { user } = useRealm();

  const mongo = user.app.currentUser.mongoClient("mongodb-atlas");
  const collection = mongo.db(databaseName).collection(collectionName);

  const [results, setResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getResults = React.useCallback(async () => {
    setIsLoading(true);
    const aggregation = await collection.aggregate(pipeline);
    setResults(aggregation);
    setIsLoading(false);
    return aggregation;
  }, [collection, pipeline]);

  React.useEffect(() => getResults, []);

  return {
    results,
    firstResult: results[0],
    getResults,
    isLoading,
  };
};
