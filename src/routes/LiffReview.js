import React, { useEffect } from "react";
import liff from "@line/liff";

export const LiffReview = () => {

  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    (async () => {
      await initLiff();
    })();
  }, []);

  return (
    <div>
      <h1>振り返り</h1>
      <div>
        <input
          type="text"
          label="今日の朝はどうでした？"
        />
      </div>
    </div>
  );
};
