import React, { createContext } from "react";
import { useLiff } from "../hooks/useLiff";

export const LiffObjectContext = createContext({});

export const LiffObjectProvider = ({ children }) => {
  const liff = useLiff();
  console.log(liff);

  return (
    <LiffObjectContext.Provider value={liff}>
      {children}
    </LiffObjectContext.Provider>
  );
};
