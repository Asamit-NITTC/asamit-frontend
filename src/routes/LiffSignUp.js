import React, { useState, useEffect } from "react";
import { useLiff } from "../hooks/useLiff";
import { useLiffInfo } from "../hooks/useLiffInfo";
import { useLiffMessage } from "../hooks/useLiffMessage";
import { useAxios } from "../hooks/useAxios";
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffSignUp = (props) => {
  const [log, setLog] = useState("");
  const { liffObject, isLoggedIn } = useLiff();
  const { sendMessages } = useLiffMessage(liffObject, isLoggedIn);
  const { idToken, displayName } = useLiffInfo(liffObject, isLoggedIn);
  const [{ isLoading }, doFetch] = useAxios();

  useEffect(() => {
    (async () => {
      if (Object.keys(liffObject).length === 0 || !idToken || !displayName)
        return;
      try {
        const res = await doFetch({
          method: "post",
          url: "/users/signup",
          body: JSON.stringify({ name: displayName }),
          headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
        });
        setLog("signup success " + JSON.stringify(res));
        const uid = res.uid;
        props.setCookieUid(uid);
        sendMessages(`登録完了\nID: ${uid}`);
      } catch (err) {
        setLog("signup failed " + JSON.stringify(err));
        if (err.response.status === 500) {
          sendMessages("登録済みです");
        } else {
          sendMessages("登録に失敗しました");
        }
      }
      liffObject?.closeWindow();
    })();
  }, [idToken, displayName]);

  return (
    <div>
      {DEBUG && <p>{log}</p>}
      {DEBUG && isLoading && <p>Loading</p>}
      <h2>登録中</h2>
      <p>ウインドウを閉じないでください！</p>
    </div>
  );
};
