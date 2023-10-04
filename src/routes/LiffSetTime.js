import React, { useState, useEffect } from "react";
import { useLiff } from "../hooks/useLiff";
import { useLiffInfo } from "../hooks/useLiffInfo";
import { useLiffMessage } from "../hooks/useLiffMessage";
import { useAxios } from "../hooks/useAxios";
import { useLocation } from "react-router-dom";
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffSetTime = (props) => {
  const [log, setLog] = useState("");
  const [uid, setUid] = useState(props.uid);
  //const [idToken, setIdToken] = useState("");
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const targetTime = query.get("target-time");
  const { liffObject, isLoggedIn } = useLiff();
  const { sendMessages } = useLiffMessage(liffObject, isLoggedIn);
  const { idToken } = useLiffInfo(liffObject, isLoggedIn);
  const [{ isLoading }, doFetch] = useAxios();

  useEffect(() => {
    (async () => {
      if (uid == null && idToken) {
        try {
          const res = await doFetch({
            method: "get",
            url: "/users/inquiry-sub",
            headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
          });
          setUid(res.uid);
        } catch (err) {
          setLog("failed to fetch uid");
        }
      }
      if (uid && idToken) {
        try {
          const res = await doFetch({
            method: "put",
            url: "/target-time/set",
            body: JSON.stringify({
              uid: uid,
              targetTime: `2023-06-27T${targetTime}:00+10:00`,
            }),
            headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
          });
          setLog("time updated " + JSON.stringify(res));
          sendMessages("起床時刻を更新しました");
        } catch (err) {
          setLog("failed to update time " + JSON.stringify(err));
          sendMessages("時刻更新に失敗しました");
        } finally {
          liffObject.closeWindow();
        }
      }
    })();
  }, [idToken, uid]);

  return (
    <div>
      {DEBUG && <p>{log}</p>}
      {DEBUG && isLoading && <p>Loading</p>}
      <h2>登録中</h2>
      <p>ウインドウを閉じないでください！</p>
    </div>
  );
};
