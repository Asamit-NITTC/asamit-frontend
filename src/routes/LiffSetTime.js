import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const BASE_URL = process.env.BASE_URL;
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

import liff from "@line/liff/core";
import SendMessages from "@line/liff/send-messages";
import CloseWindow from "@line/liff/close-window";
import GetIDToken from "@line/liff/get-id-token";
liff.use(new SendMessages());
liff.use(new CloseWindow());
liff.use(new GetIDToken());

export const LiffSetTime = (props) => {
  const [log, setLog] = useState("");
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const targetTime = query.get("target-time");

  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
    } catch (err) {
      console.log("Failed to init");
    }
  };

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
      liff.sendMessages([
        {
          type: "text",
          text: `起床時刻を更新しました`,
        },
      ]);
      liff.closeWindow();
    } catch (err) {
      const errMsg = JSON.stringify(err.response);
      setLog("failed to update time " + errMsg);
      liff.sendMessages([
        {
          type: "text",
          text: "時刻更新に失敗しました",
        },
      ]);
    } finally {
      liff.closeWindow();
    }
  };

  useEffect(() => {
    (async () => {
      await initLiff();
      const idToken = liff.getIDToken();
      await setTargetTime(idToken);
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
