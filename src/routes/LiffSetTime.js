import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import liff from "@line/liff";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;

export const LiffSetTime = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const timestamp = query.get("timestamp");

  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
    } catch (err) {
      console.log("Failed to init");
    }
  };

  useEffect(() => {
    (async () => {
      await initLiff();
    })();
  }, []);

  return (
    <div>
      <div>
        <p>mm:ssに起きます！</p>
        <p>{timestamp}</p>
      </div>
    </div>
  );
};
