import React, { useEffect, useState } from "react";
import { useLiff } from "../hooks/useLiff";
import { useLiffInfo } from "../hooks/useLiffInfo";
import { useLiffMessage } from "../hooks/useLiffMessage";
import { useLocation } from "react-router-dom";
import { useUid } from "../hooks/useUid";
import { useAxios } from "../hooks/useAxios";
import { Block } from "../ui/Block";
import { TextForm } from "../components/TextForm";
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffWakeUp = (props) => {
  const { liffObject, isLoggedIn } = useLiff();
  const { sendMessages } = useLiffMessage(liffObject, isLoggedIn);
  const { idToken } = useLiffInfo(liffObject, isLoggedIn);
  const [{ isLoading }, doFetch] = useAxios();
  const [log, setLog] = useState("");
  const [error, setError] = useState("");
  const [{ uid }, fetchUid] = useUid(props.uid);
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const timestamp = parseInt(query.get("timestamp"), 10);
  const dt = new Date(timestamp);
  const isoStr = dt.toISOString();

  const postReport = async (postFinal) => {
    const dt = new Date(timestamp);

    try {
      const res = await doFetch({
        method: "post",
        url: "/wake/report",
        body: JSON.stringify({
          uid: uid,
          wakeUpTime: dt.toISOString(),
          comment: postFinal,
        }),
        headers: JSON.stringify({ Authorization: `Bearer ${idToken}` }),
      });
      setLog("posted " + JSON.stringify(res.data));
      sendMessages("起床報告を記録しました");
    } catch (err) {
      setLog("failed to post report " + JSON.stringify(err));
      setError("failed");
      sendMessages("起床報告に失敗しました");
    } finally {
      liffObject?.closeWindow();
    }
  };

  useEffect(() => {
    if (!uid && idToken) {
      fetchUid(idToken);
      props.setCookieUid(uid);
    }
  }, [idToken, uid]);

  return (
    <main>
      {DEBUG && <p>{log}</p>}
      {DEBUG && isLoading && <p>Loading</p>}
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
    </main>
  );
};
