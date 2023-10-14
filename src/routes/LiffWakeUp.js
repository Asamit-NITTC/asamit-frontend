import React, { useContext, useState } from "react";
import { useLiffMessage } from "../hooks/useLiffMessage";
import { useLocation } from "react-router-dom";
import { useUid } from "../hooks/useUid";
import { useAxios } from "../hooks/useAxios";
import { Block } from "../ui/Block";
import { TwoTimeDisp } from "../ui/TwoTimeDisp";
import { TextForm } from "../components/TextForm";
import { LiffObjectContext } from "../components/LiffObjectProvider";
import { UserInfoContext } from "../components/UserInfoProvider";
const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffWakeUp = () => {
  const { liffObject, isLoggedIn, isInClient } = useContext(LiffObjectContext);
  const [{ userInfo, targetTime }, putData] = useContext(UserInfoContext);
  const { sendMessages } = useLiffMessage(liffObject, isLoggedIn);
  const [{ isLoading }, doFetch] = useAxios();
  const [log, setLog] = useState("");
  const [error, setError] = useState("");
  const { uid } = useUid();
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const timestamp = parseInt(query.get("timestamp"), 10);
  const dt = new Date(timestamp);
  const isoStr = dt.toISOString();

  const postReport = async (postFinal) => {
    const dt = new Date(timestamp);
    const idToken = liffObject?.getIDToken();
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
      const newPoint = userInfo.point + 1;
      putData({ point: newPoint });
    } catch (err) {
      setLog("failed to post report " + JSON.stringify(err));
      setError("failed");
      sendMessages("起床報告に失敗しました");
    } finally {
      liffObject?.closeWindow();
    }
  };

  if (!isInClient && !DEBUG) {
    return <h1>不正な遷移です</h1>;
  } else {
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
            <p className="date">{isoStr.slice(0, 10)}</p>
            <TwoTimeDisp
              main={dt.getHours() + ":" + dt.getMinutes()}
              sub={targetTime}
            />
          </div>
          <div className="form">
            <h4>コメント</h4>
            <TextForm
              btnText="コメントを送信"
              placeholder="目標・朝活を頑張る仲間に挨拶等なんでも！"
              submitAction={(postFinal) => postReport(postFinal)}
            />
          </div>
        </Block>
      </main>
    );
  }
};
