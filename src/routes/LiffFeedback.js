import React, { useEffect } from "react";
import liff from "@line/liff";

export const LiffFeedback = () => {
  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
    } catch (err) {
      console.log("Failed to init liff");
    }
  };

  useEffect(() => {
    (async () => {
      await initLiff();
    })();
  }, []);

  return (
    <div className="main color-page">
      <h1>準備中！</h1>
    </div>
  );
};
