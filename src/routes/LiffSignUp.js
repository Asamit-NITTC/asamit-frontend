import React, { useState, useEffect } from "react";
import liff from "@line/liff";
import axios from "axios";
const BASE_URL = process.env.BASE_URL;
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffSignUp = (props) => {
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
      const uid = res.data.uid;
      props.setCookieUid(uid);
      liff.sendMessages([
        {
          type: "text",
          text: `登録完了\nID: ${uid}`,
        },
      ]);
    } catch (err) {
      const errMsg = err.response.data.error;
      setLog("signup failed " + errMsg);
      if (errMsg === "登録済み") {
        liff.sendMessages([
          {
            type: "text",
            text: "登録済みです",
          },
        ]);
      } else {
        liff.sendMessages([
          {
            type: "text",
            text: "登録に失敗しました",
          },
        ]);
      }
    } finally {
      liff.closeWindow();
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
      {DEBUG && <p>{log}</p>}
      <h2>登録中</h2>
      <p>ウインドウを閉じないでください！</p>
    </div>
  );
};
