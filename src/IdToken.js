import React, { useState, useEffect } from "react";

import liff from "@line/liff/core";
import GetIDToken from "@line/liff/get-id-token";
import Login from "@line/liff/login";
import IsLoggedIn from "@line/liff/is-logged-in";
liff.use(new GetIDToken());
liff.use(new Login());
liff.use(new IsLoggedIn());

export const IdToken = () => {
  const [idToken, setIdToken] = useState("");
  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });

    } catch (err) {
      console.log("Failed to init liff");
    }
    if (!liff.isLoggedIn()) {
      liff.login({});
    }
  };

  useEffect(() => {
    (async () => {
      await initLiff();
      const gotIdToken = liff.getIDToken();
      setIdToken(gotIdToken);
    })();
  }, []);

  return (
    <div className="main">
      <h2>IDtoken Generator</h2>
      <p>{ idToken }</p>
    </div>
  );
};
