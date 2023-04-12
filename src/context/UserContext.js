import React from "react";
import { useUser } from "../hooks/useUser";
import { useRealmContext } from "./RealmContext";

const UserContext = React.createContext({ user: null });

export function UserContextProvider({ children }) {
  const { user } = useRealmContext();
  const { setAnswered } = useUser();

  const [answeredCount, setAnwseredCount] = React.useState(
    user.customData?.questions?.answered?.length ?? 0
  );

  const answeredQuestions = React.useMemo(
    () => user?.customData?.questions?.answered,
    [user]
  );

  const savedQuestions = React.useMemo(
    () => user?.customData?.questions?.saved?.map((question) => question.id),
    [user]
  );

  const setQuestionStatus = React.useCallback(
    async (id, status) => {
      await setAnswered(id, status);
      setAnwseredCount(user.customData?.questions?.answered?.length);
    },
    [setAnswered, user.customData?.questions?.answered?.length]
  );

  return (
    <UserContext.Provider
      value={{
        answeredCount,
        answeredQuestions,
        savedQuestions,
        setQuestionStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => React.useContext(UserContext);
