import React, { useEffect, useState } from "react";

import liff from "@line/liff/core";
import IsLoggedIn from "@line/liff/is-logged-in"
import Login from "@line/liff/login"
import IsInClient from "@line/liff/is-in-client"
liff.use(new IsLoggedIn());
liff.use(new Login());
liff.use(new IsInClient());

export const LiffRoot = () => {
  const [isInClient, setIsInClient] = useState(true);
  useEffect(() => {
    (async () => {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
      if (!liff.isInClient()) setIsInClient(false);
      if (!liff.isLoggedIn()) {
        liff.login();
        setIsInClient(true);
      }
    })()
  }, []);

  return (
    <>
      {!isInClient && <h1>This app is only available on LIFF browser</h1>}
    </>
  )
}
