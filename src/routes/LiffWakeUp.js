import React, { useState } from "react";
import { useLiff } from "../hooks/useLiff";
import { useLiffInfo } from "../hooks/useLiffInfo";
import { useLiffMessage } from "../hooks/useLiffMessage";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Block } from "../ui/Block";
import { TextForm } from "../components/TextForm";
const BASE_URL = process.env.BASE_URL;
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffWakeUp = (props) => {
  const { liffObject, isLoggedIn } = useLiff();
  const { sendMessages } = useLiffMessage(liffObject, isLoggedIn);
  const { idToken } = useLiffInfo(liffObject, isLoggedIn);
  const [log, setLog] = useState("");
  const [error, setError] = useState("");
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const timestamp = parseInt(query.get("timestamp"), 10);
  const dt = new Date(timestamp);
  const isoStr = dt.toISOString();

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
    //const idToken = liff.getIDToken();
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
      sendMessages("起床報告を記録しました");
    } catch (err) {
      const errMsg = JSON.stringify(err.response);
      setLog("failed to post report " + errMsg);
      sendMessages("起床報告に失敗しました");
    } finally {
      /** TODO: 閉じる */
      //liff.closeWindow();
    }
  };

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
