import React, { useState, useEffect, useContext } from "react";
import { useLiffMessage } from "../hooks/useLiffMessage";
import { useAxios } from "../hooks/useAxios";
import { useUid } from "../hooks/useUid";
import { useLocation } from "react-router-dom";
import { LiffObjectContext } from "../components/LiffObjectProvider";
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffSetTime = () => {
  const [log, setLog] = useState("");
  const { uid } = useUid();
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const targetTime = query.get("target-time");
  const { liffObject, isLoggedIn, isInClient } = useContext(LiffObjectContext);
  const { sendMessages } = useLiffMessage(liffObject, isLoggedIn);
  const [{ isLoading }, doFetch] = useAxios();

  useEffect(() => {
    (async () => {
      if (Object.keys(liffObject).length === 0) return;
      const idToken = liffObject?.getIDToken();
      if (uid && idToken) {
        try {
          const dt = new Date(`2023-04-01 ${targetTime}`);
          const res = await doFetch({
            method: "put",
            url: "/target-time/set",
            body: JSON.stringify({
              uid: uid,
              targetTime: dt.toISOString(),
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
  }, [liffObject]);

  return (
    <>
      {!isInClient && <h1>不正な遷移です</h1>}
      {isInClient && (
        <main>
          {DEBUG && <p>{log}</p>}
          {DEBUG && isLoading && <p>Loading</p>}
          <h2>登録中</h2>
          <p>ウインドウを閉じないでください！</p>
        </main>
      )}
    </>
  );
};
