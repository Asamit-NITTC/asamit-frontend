import React from "react";
import { useLiff } from "./hooks/useLiff";
import { Navigate } from "react-router-dom";

export const LiffRoot = () => {
  const { isInClient } = useLiff();

  return (
    <>
      {!isInClient && <Navigate replace to="/app/home" />
      }
    </>
  )
}
