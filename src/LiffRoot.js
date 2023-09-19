import React, { useState, useEffect } from "react";
import liff from "@line/liff";

export const LiffRoot = () => {
  const [isLiff, setIsLiff] = useState(true);
  useEffect(() => {
    (async () => {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
      if (!liff.isInClient()) setIsLiff(false);
    })()
  }, []);

  return (
    <>
      {!isLiff && <h1>This app is only available on LIFF browser</h1>}
    </>
  )
}
