import React from "react";
import * as Realm from "realm-web";

// Set your App ID
const APP_ID = "mongoquest-vbqkm";
const atlas = new Realm.App({ id: APP_ID });

const RealmContext = React.createContext({});

export function RealmContextProvider({ children }) {
  const [user, setUser] = React.useState(atlas.currentUser);

  const loginUser = React.useCallback(async () => {
    const user = await atlas.logIn(Realm.Credentials.anonymous());
    setUser(user);
  }, []);

  const refreshUser = React.useCallback(async () => {
    await atlas.currentUser.refreshCustomData();
    setUser(atlas.currentUser);
  }, []);

  const logoutUser = React.useCallback(
    async () => await atlas.currentUser.logOut(),
    []
  );

  return (
    <RealmContext.Provider value={{ user, loginUser, refreshUser, logoutUser }}>
      {children}
    </RealmContext.Provider>
  );
}

export const useRealmContext = () => React.useContext(RealmContext);
