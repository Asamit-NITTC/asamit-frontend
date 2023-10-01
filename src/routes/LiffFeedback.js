import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";

import liff from "@line/liff/core";
import SendMessages from "@line/liff/send-messages";
import CloseWindow from "@line/liff/close-window";
import { TextArea } from "../components/TextArea";
import { Block } from "../components/Block";
liff.use(new SendMessages());
liff.use(new CloseWindow());

export const LiffFeedback = () => {
  const [post, setPost] = useState("");
  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
    } catch (err) {
      console.log("Failed to init liff");
    }
  };

  const handleTextChange = (event) => {
    const currentVal = event.target.value;
    setPost(currentVal);
  };

  const handleSubmit = () => {
    const postFinal = post;
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
        <h2>問い合わせフォーム</h2>
        <TextArea value={post} onChange={handleTextChange} />
        <Button visual="primary" type="submit" onClick={handleSubmit}>
          フィードバックを送信
        </Button>
      </Block>
    </div>
  );
};
