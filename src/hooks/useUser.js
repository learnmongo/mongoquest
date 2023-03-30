import React from "react";
import { useRealm } from "./useRealm";

export const useUser = () => {
  const { user, refreshUser } = useRealm();
  const mongo = user.app.currentUser.mongoClient("mongodb-atlas");
  const collection = mongo.db("mongoquest").collection("users");

  const [isLoading, setIsLoading] = React.useState(false);

  const setAnwsered = React.useCallback(async (id, status = "ADD") => {
    if (status === "ADD") {
      setIsLoading(true);
      const response = await collection.updateOne(
        { user_id: user.id },
        { $addToSet: { "questions.anwsered": id } }
      );
      setIsLoading(false);
      return response;
    }

    if (status === "REMOVE") {
      setIsLoading(true);
      const response = await collection.updateOne(
        { user_id: user.id },
        { $pull: { "questions.anwsered": id } }
      );
      setIsLoading(false);
      return response;
    }
  }, []);

  const saveNote = React.useCallback(async (id, note = "") => {
    setIsLoading(true);
    const response = await collection.updateOne(
      { user_id: user.id },
      { $set: { "questions.saved.$[elem].note": note } },
      { arrayFilters: [{ "elem.id": id.toString() }] }
    );
    refreshUser();
    setIsLoading(false);
    return response;
  }, []);

  return {
    setAnwsered,
    saveNote,
    isLoading,
  };
};
