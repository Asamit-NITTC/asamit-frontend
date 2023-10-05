import React from "react";
import { useLiff } from "./hooks/useLiff";
import { Navigate } from "react-router-dom";

export const LiffRoot = () => {
  const { isLoggedIn, isInClient } = useLiff();

  return (
    <>
      {!isInClient &&
        isLoggedIn && <Navigate replace to="/app/home" />
      }
    </>
  )
}
