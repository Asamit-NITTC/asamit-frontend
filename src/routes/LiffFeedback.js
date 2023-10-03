import React from "react";
import { useLiff } from "../hooks/useLiff";
import { useLiffMessage } from "../hooks/useLiffMessage";
import { TextForm } from "../components/TextForm";
import { Block } from "../ui/Block";

export const LiffFeedback = () => {
  const { liffObject, isLoggedIn } = useLiff();
  const { sendMessages } = useLiffMessage(liffObject, isLoggedIn);
  const sendFeedback = (postFinal) => {
    sendMessages("feedback>> " + postFinal);
    liffObject.closeWindow();
  };

  return (
    <div className="main">
      <Block>
        <p>問い合わせフォーム</p>
        <TextForm
          btnText="フィードバックを送信"
          submitAction={(postFinal) => sendFeedback(postFinal)}
        />
      </Block>
    </div>
  );
};
