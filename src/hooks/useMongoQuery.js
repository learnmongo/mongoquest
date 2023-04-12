import React from "react";
import { useRealmContext } from "../context/RealmContext";

export const useMongoQuery = ({
  databaseName = "mongoquest",
  collectionName,
}) => {
  const { user } = useRealmContext();

  const mongo = user.app.currentUser.mongoClient("mongodb-atlas");
  const collection = mongo.db(databaseName).collection(collectionName);

  const [results, setResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const find = React.useCallback(
    async (query = {}, options = undefined) => {
      setIsLoading(true);
      const results = await collection.find(query, options);
      setResults(results);
      setIsLoading(false);
      return results;
    },
    [collection]
  );

  const findOne = React.useCallback(
    async (query = {}, options = undefined) => {
      setIsLoading(true);
      const result = await collection.findOne(query, options);
      setResults([result]);
      setIsLoading(false);
      return [result];
    },
    [collection]
  );

  return {
    find,
    findOne,
    isLoading,
    results,
  };
};
