import { BSON } from "realm-web";
export const useUrl = () => {
  const id = BSON.ObjectId(window.location.pathname.split("/")[2]);

  const updateQuestionUrl = (_id) =>
    window.history.pushState({}, null, `/trial/${_id}`);
  return { id, updateQuestionUrl };
};
