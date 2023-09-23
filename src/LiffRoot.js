import React, { useState, useEffect } from "react";
import liff from "@line/liff";

export const LiffRoot = () => {
  const [isInClient, setIsInClient] = useState(true);
  useEffect(() => {
    (async () => {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
      //if (!liff.isInClient()) setIsInClient(false);
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    })()
  }, []);

  return (
    <>
      <h1>LIFFROOT</h1>
      {!isInClient && <h1>This app is only available on LIFF browser</h1>}
    </>
  )
}
