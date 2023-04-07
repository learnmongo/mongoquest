import React from "react";
import { useRealmContext } from "../context/RealmContext";

export const useUser = () => {
  const { user, refreshUser } = useRealmContext();
  const mongo = user.app.currentUser.mongoClient("mongodb-atlas");
  const collection = mongo.db("mongoquest").collection("users");

  const [isLoading, setIsLoading] = React.useState(false);

  const setAnswered = React.useCallback(
    async (id, status = "ADD") => {
      if (status === "ADD") {
        setIsLoading(true);
        const response = await collection.updateOne(
          { user_id: user.id },
          { $addToSet: { "questions.answered": id } }
        );
        await refreshUser();
        setIsLoading(false);
        return response;
      }

      if (status === "REMOVE") {
        setIsLoading(true);
        const response = await collection.updateOne(
          { user_id: user.id },
          { $pull: { "questions.answered": id } }
        );
        await refreshUser();
        setIsLoading(false);
        return response;
      }
    },
    [collection, refreshUser, user.id]
  );

  const saveNote = React.useCallback(
    async (id, note = "") => {
      setIsLoading(true);
      // example of running two queries back to back
      let responses = [];

      responses.push(
        await collection.updateOne(
          {
            user_id: user.id.toString(),
            "questions.saved.id": id,
          },
          {
            $set: { "questions.saved.$.note": note },
          }
        )
      );

      responses.push(
        await collection.updateOne(
          {
            user_id: user.id.toString(),
          },
          {
            $addToSet: { "questions.saved": { id: id, note: note } },
          },
          { upsert: true }
        )
      );

      await refreshUser();
      setIsLoading(false);

      return responses;
    },
    [collection, refreshUser, user.id]
  );

  return {
    setAnswered,
    saveNote,
    isLoading,
  };
};
