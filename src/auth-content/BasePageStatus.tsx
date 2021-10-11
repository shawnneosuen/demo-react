/*
 * @Author: your name
 * @Date: 2021-10-02 01:23:37
 * @LastEditTime: 2021-10-03 23:40:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/auth-content/BasePageStatus.tsx
 */
import { User } from "boot/model";
import React, { ReactNode, useState } from "react";
import * as action from "./Action";

const AuthContext = React.createContext<
  | {
      auth: User | null;
      setAuth: (auth: User | null) => Promise<void>;
      getAuth: (auth: User) => Promise<User>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AutoContext";

export const BaseStatusProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAu] = useState<User | null>(null);

  const setAuth = (auth: User | null) => action.setLoginAuth(auth).then(setAu);
  const getAuth = (auth: User) => action.getAuth(auth);

  return (
    <AuthContext.Provider
      children={children}
      value={{ auth, setAuth, getAuth }}
    />
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext Error! ");
  }
  return context;
};
