import React, { useState, useEffect } from "react";
import { useLiff } from "../hooks/useLiff";
import { useLiffInfo } from "../hooks/useLiffInfo";
import { useLiffMessage } from "../hooks/useLiffMessage";
import axios from "axios";
const BASE_URL = process.env.BASE_URL;
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffSignUp = (props) => {
  const { liffObject, isLoggedIn } = useLiff();
  const { sendMessages } = useLiffMessage(liffObject, isLoggedIn);
  const { idToken, displayName } = useLiffInfo(liffObject, isLoggedIn);
  const [log, setLog] = useState("");

  const signup = async (idToken, displayName) => {
    const url = new URL(`${BASE_URL}/users/signup`);
    try {
      const res = await axios.post(
        url,
        {
          name: displayName,
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
      sendMessages(`登録完了\nID: ${uid}`);
    } catch (err) {
      const errMsg = err.response.data.error;
      setLog("signup failed " + errMsg);
      if (errMsg === "登録済み") {
        sendMessages("登録済みです");
      } else {
        sendMessages("登録に失敗しました");
      }
    } finally {
      liffObject.closeWindow();
    }
  };

  useEffect(() => {
    (async () => {
      await signup(idToken, displayName);
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
