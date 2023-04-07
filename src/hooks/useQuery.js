import React from "react";
import { useRealm } from "./useRealm";

function delay(amount = 100) {
  return new Promise((res) => setTimeout(res, amount));
}

export const useQuery = () => {
  //const { user } = useRealm();
  //const mongo = user.app.currentUser.mongoClient("mongodb-atlas");
  //const collection = mongo.db("mongoquest").collection("users");

  const [results, setResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  /*
  const getResults = React.useCallback(async () => {
    setIsLoading(true);
    const aggregation = await collection.aggregate(pipeline);
    setResults(aggregation);
    // just here to show loader
    await delay(300);
    setIsLoading(false);
  }, [collection, pipeline]);
  */

  const find = React.useCallback(async (query = {}) => {
    setIsLoading(true);
    await delay(500);
    console.log("find", { query });
    setIsLoading(false);
  }, []);

  const findOne = React.useCallback(async (query = {}) => {
    setIsLoading(true);
    await delay(500);
    console.log("findOne", { query });
    setIsLoading(false);
  }, []);

  const count = React.useCallback(async (query = {}) => {
    setIsLoading(true);
    await delay(500);
    // find(query).count()
    console.log("count", { query });
    setIsLoading(false);
  }, []);

  // have this return a function instead, and then we can call it anytime to get the next question
  return {
    find,
    findOne,
    count,
    isLoading,
  };
};
