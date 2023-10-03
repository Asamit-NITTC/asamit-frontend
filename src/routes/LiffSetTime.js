import React, { useState, useEffect } from "react";
import { useLiff } from "../hooks/useLiff";
import { useLiffInfo } from "../hooks/useLiffInfo";
import { useLiffMessage } from "../hooks/useLiffMessage";
import { useLocation } from "react-router-dom";
import axios from "axios";
const BASE_URL = process.env.BASE_URL;
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffSetTime = (props) => {
  const { liffObject, isLoggedIn } = useLiff();
  const { sendMessages } = useLiffMessage(liffObject, isLoggedIn);
  const { idToken } = useLiffInfo(liffObject, isLoggedIn);
  const [log, setLog] = useState("");
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const targetTime = query.get("target-time");

  const fetchUID = async (idToken) => {
    const url = `${BASE_URL}/users/inquiry-sub`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return res.data.uid;
    } catch (err) {
      throw new Error("uid取得に失敗しました" + err.response.data);
    }
  };

  const setTargetTime = async (idToken) => {
    const url = new URL(`${BASE_URL}/target-time/set`);
    let currentUid = props.uid;
    try {
      if (currentUid == null) {
        currentUid = await fetchUID(idToken);
        props.setCookieUid(currentUid);
      }
      const res = await axios.put(
        url,
        {
          uid: currentUid,
          targetTime: `2023-06-27T${targetTime}:00+10:00`,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );
      setLog("time updated " + JSON.stringify(res.data));
      sendMessages("起床時刻を更新しました");
    } catch (err) {
      const errMsg = JSON.stringify(err.response);
      setLog("failed to update time " + errMsg);
      sendMessages("時刻更新に失敗しました");
    } finally {
      //liff.closeWindow();
    }
  };

  useEffect(() => {
    (async () => {
      if (idToken) await setTargetTime(idToken);
    })();
  }, [idToken]);

  return (
    <div>
      {DEBUG && <p>{log}</p>}
      <h2>登録中</h2>
      <p>ウインドウを閉じないでください！</p>
    </div>
  );
};
