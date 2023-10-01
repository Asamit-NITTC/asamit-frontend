import React, { useEffect } from "react";

import liff from "@line/liff/core";
import SendMessages from "@line/liff/send-messages";
import CloseWindow from "@line/liff/close-window";
import { TextForm } from "../components/TextForm";
import { Block } from "../components/Block";
liff.use(new SendMessages());
liff.use(new CloseWindow());

export const LiffFeedback = () => {
  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
    } catch (err) {
      console.log("Failed to init liff");
    }
  };

  const handleSubmit = (postFinal) => {
    liff.sendMessages([
      {
        type: "text",
        text: "feedback>> " + postFinal,
      },
    ]);
    liff.closeWindow();
  };

  useEffect(() => {
    (async () => {
      await initLiff();
    })();
  }, []);

  return (
    <div className="main">
      <Block>
        <p>問い合わせフォーム</p>
        <TextForm
          btnText="フィードバックを送信"
          submitAction={(postFinal) => handleSubmit(postFinal)}
        />
      </Block>
    </div>
  );
};
