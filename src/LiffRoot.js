import React from "react";
import { useLiff } from "./hooks/useLiff";

export const LiffRoot = () => {
  const { liffObject, isInited } = useLiff();
  //console.log({liffObject, isInited});

  return (
    <>
      <p>isInited: {isInited}</p>
      {/*!isInClient && <h1>This app is only available on LIFF browser</h1>*/}
    </>
  )
}
