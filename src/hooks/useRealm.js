import React from "react";
import * as Realm from "realm-web";

// Set your App ID
const APP_ID = "mongoquest-vbqkm";
const atlas = new Realm.App({ id: APP_ID });

export const useRealm = () => {
  const [user, setUser] = React.useState(atlas.currentUser);

  const loginUser = React.useCallback(async () => {
    const user = await atlas.logIn(Realm.Credentials.anonymous());
    setUser(user);
  }, []);

  const refreshUser = React.useCallback(
    async () => await atlas.currentUser.refreshCustomData(),
    []
  );

  const logoutUser = React.useCallback(
    async () => await atlas.currentUser.logOut(),
    []
  );

  return { user, loginUser, logoutUser, refreshUser };
};
