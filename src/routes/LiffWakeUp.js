import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import liff from "@line/liff";
import axios from "axios";
const BASE_URL = process.env.BASE_URL;

export const LiffWakeUp = (props) => {
  const [post, setPost] = useState("");
  const [error, setError] = useState("");
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const timestamp = parseInt(query.get("timestamp"), 10);

  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
    } catch (err) {
      setError("Failed to init liff");
    }
  };

  const fetchUID = async (idToken) => {
    const url = `${BASE_URL}/users/inquiry-sub`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      setError("uid fetched " + res.data.uid);
      return res.data.uid;
    } catch (err) {
      throw new Error("uid取得に失敗しました" + err.response.data);
    }
  };

  const postReport = async () => {
    const url = new URL(`${BASE_URL}/wake/report`);
    const idToken = liff.getIDToken();
    const dt = new Date(timestamp);
    // TODO: let使わないように
    let currentUid = props.uid;
    try {
      if (currentUid == null) {
        currentUid = await fetchUID(idToken);
        props.setCookieUid(currentUid);
      }
      const res = await axios.post(
        url,
        {
          uid: currentUid,
          wakeUpTime: dt.toISOString(),
          comment: post,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );
      setError("posted " + JSON.stringify(res.data));
    } catch (err) {
      const errMsg = JSON.stringify(err.response);
      setError("failed to post report " + errMsg);
    }
  };

  const handleTextChange = (event) => {
    const currentVal = event.target.value;
    setPost(currentVal);
  };

  const handleSubmit = () => {
    postReport();
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
        <p>{timestamp}</p>
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
