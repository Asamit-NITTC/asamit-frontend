import React, { createContext } from "react";
import { useUidInfo } from "../hooks/useUidInfo";

export const UserInfoContext = createContext({});

export const UserInfoProvider = ({ children }) => {
  const { userInfo, summitStatus } = useUidInfo(
    "a7821ec5-4e15-41da-9085-16495fc35de9",
  );

  return (
    <UserInfoContext.Provider value={{ userInfo, summitStatus }}>
      {children}
    </UserInfoContext.Provider>
  );
};
