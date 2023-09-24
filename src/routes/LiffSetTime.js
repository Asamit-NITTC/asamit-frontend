import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import liff from "@line/liff";
import axios from "axios";
const BASE_URL = process.env.BASE_URL;

export const LiffSetTime = (props) => {
  const [log, setLog] = useState("");
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const targetTime = query.get("target-time");

  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
    } catch (err) {
      console.log("Failed to init");
    }
  };

  const setTargetTime = async (idToken) => {
    const url = new URL(`${BASE_URL}/target-time/set`);
    try {
      const res = await axios.put(
        url,
        {
          uid: props.uid,
          targetTime: `2023-06-27T${targetTime}:00+10:00`,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );
      setLog("time updated " + JSON.stringify(res.data));
    } catch (err) {
      const errMsg = JSON.stringify(err.response);
      setLog("failed to update time " + errMsg);
    }
  };

  useEffect(() => {
    (async () => {
      await initLiff();
      const idToken = liff.getIDToken();
      await setTargetTime(idToken);
    })();
  }, []);

  return (
    <div>
      <div>
        <h1>{targetTime}に起きます！</h1>
        <p>{log}</p>
      </div>
    </div>
  );
};
