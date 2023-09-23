import React, { useState, useEffect } from "react";
import liff from "@line/liff";
import axios from "axios";
const BASE_URL = process.env.BASE_URL;
import LIFFInspectorPlugin from "@line/liff-inspector";
liff.use(new LIFFInspectorPlugin());

export const LiffSignUp = () => {
  const [log, setLog] = useState("");

  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
    } catch (err) {
      console.log("init error");
    }
  };

  const signup = async (idToken, profile) => {
    const url = new URL(`${BASE_URL}/users/signup`);
    try {
      const res = await axios.post(
        url,
        {
          name: profile.displayName,
          icon: profile.pictureUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );
      setLog("signup success" + JSON.stringify(res.data));
    } catch (err) {
      setLog("signup failed" + JSON.stringify(err));
    }
  };

  useEffect(() => {
    (async () => {
      await initLiff();
      const idToken = liff.getIDToken();
      const profile = await liff.getProfile();
      const isSuccessSignUp = await signup(idToken, profile);
      if (isSuccessSignUp) {
        liff.closeWindow();
      }
    })();
  }, []);

  return (
    <div>
      <h1>登録</h1>
      <p>{log}</p>
    </div>
  );
};
