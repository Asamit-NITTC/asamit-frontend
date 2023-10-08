import React, { createContext } from "react";
import { useUid } from "../hooks/useUid";
import { useUidInfo } from "../hooks/useUidInfo";

export const UserInfoContext = createContext({});

export const UserInfoProvider = ({ children }) => {
  const { uid } = useUid();
  const { userInfo, summitStatus, targetTime } = useUidInfo(uid);

  return (
    <UserInfoContext.Provider value={{ userInfo, summitStatus, targetTime }}>
      {children}
    </UserInfoContext.Provider>
  );
};
