import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Block } from "../ui/Block";
import { TextForm } from "../components/TextForm";
const BASE_URL = process.env.BASE_URL;
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

import liff from "@line/liff/core";
import SendMessages from "@line/liff/send-messages";
import CloseWindow from "@line/liff/close-window";
import GetIDToken from "@line/liff/get-id-token";
liff.use(new SendMessages());
liff.use(new CloseWindow());
liff.use(new GetIDToken());

export const LiffWakeUp = (props) => {
  const [log, setLog] = useState("");
  const [error, setError] = useState("");
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const timestamp = parseInt(query.get("timestamp"), 10);
  const dt = new Date(timestamp);
  const isoStr = dt.toISOString();

  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
    } catch (err) {
      setError("Failed to init liff");
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
      setError("uid fetched " + res.data.uid);
      return res.data.uid;
    } catch (err) {
      throw new Error("uid取得に失敗しました" + err.response.data);
    }
  };

  const postReport = async (postFinal) => {
    const url = new URL(`${BASE_URL}/wake/report`);
    const idToken = liff.getIDToken();
    const dt = new Date(timestamp);
    // TODO: let使わないように
    let currentUid = props.uid;
    try {
      if (currentUid == null) {
        currentUid = await fetchUID(idToken);
        props.setCookieUid(currentUid);
      }
      const res = await axios.post(
        url,
        {
          uid: currentUid,
          wakeUpTime: dt.toISOString(),
          comment: postFinal,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );
      setLog("posted " + JSON.stringify(res.data));
      liff.sendMessages([
        {
          type: "text",
          text: "起床報告を記録しました",
        },
      ]);
    } catch (err) {
      const errMsg = JSON.stringify(err.response);
      setLog("failed to post report " + errMsg);
      liff.sendMessages([
        {
          type: "text",
          text: "起床報告に失敗しました",
        },
      ]);
    } finally {
      liff.closeWindow();
    }
  };

  useEffect(() => {
    (async () => {
      await initLiff();
    })();
  }, []);

  return (
    <div className="main color-page">
      {DEBUG && <p>{log}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      <Block>
        <div>
          <p>{isoStr.slice(0, 10)}</p>
          <p>{dt.getHours() + ":" + dt.getMinutes()}</p>
        </div>
        <div>
          <p>コメント</p>
          <TextForm
            btnText="コメントを送信"
            submitAction={(postFinal) => postReport(postFinal)}
          />
        </div>
      </Block>
    </div>
  );
};
