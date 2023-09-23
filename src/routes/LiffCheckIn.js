import React, { useState, useEffect } from "react";
import liff from "@line/liff";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;

export const LiffCheckIn = () => {
  const [post, setPost] = useState("");
  const [error, setError] = useState("");

  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
    } catch (err) {
      setError("Failed to init liff");
    }
  };

  const handleTextChange = (event) => {
    const currentVal = event.target.value;
    setPost(currentVal);
  };

  const handleSubmit = () => {
    /* TODO: 送信 */
  };

  useEffect(() => {
    (async () => {
      await initLiff();
    })();
  }, []);

  return (
    <div>
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      <div>
        <p>yyyy/MM/dd</p>
        <p>mm:ss</p>
        <p>★</p>
      </div>
      <div>
        <p>コメント</p>
        <input
          type="text"
          value={post}
          label="今日は何する？"
          onChange={handleTextChange}
        />
        <input type="submit" onClick={handleSubmit} value="コメントを送信" />
      </div>
      <div>
        <p>n日連続</p>
        <button>SNSで共有</button>
      </div>
    </div>
  );
};
