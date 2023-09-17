import React, { useState, useEffect } from "react";
import liff from "@line/liff";

export const Liff = () => {
  const [profile, setProfile] = useState("");
  const [post, setPost] = useState("");
  const [message, setMessage] = useState("");
  const [idToken, setIdToken] = useState("");
  const [isInClient, setIsInClient] = useState(true);
  const [error, setError] = useState("");

  const initLiff = async () => {
    setIsInClient(liff.isInClient());
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID })
    } catch(err) {
      setError("Failed to init liff")
    }
    setMessage("LIFF init succeeded");
    if (!liff.isLoggedIn()) {
      liff.login({});
    }
  };

  const getUserProfile = async () => {
    try {
      const profile = await liff.getProfile();
      setProfile(profile);
    } catch(err) {
      setError("Failed to get profile.")
    }
  }

  const sendMessages = (message) => {
    liff
      .sendMessages([
        {
          type: "text",
          text: message,
        },
      ])
      .then(() => {
        setMessage("message sent <liff.sendMessages()>");
      })
      .catch(() => {
        setMessage("Sending message failed <liff.sendMessages()>");
      });
  };

  const handleTextChange = (event) => {
    const currentVal = event.target.value;
    setPost(currentVal);
  };

  const handleSubmit = () => {
    sendMessages(post);
  };

  const logoutLiff = () => {
    liff.logout();
  }

  useEffect(() => {
    (async() => {
      await initLiff();
      const idToken = liff.getIDToken();
      setIdToken(idToken);
      await getUserProfile();
    })();
  }, []);

  return (
    <div>
      <h1>LINElogin(LIFF)テストアプリ</h1>
      {message && <p>{message}</p>}
      <p>userID: {profile.userId}</p>
      <p>displayName: {profile.displayName}</p>
      <p>IDtoken: {idToken}</p>
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      {isInClient && <div>
        <h2>投稿は以下から</h2>
        <input
          type="text"
          value={post}
          label="今日は何する？"
          onChange={handleTextChange}
        />
        <input type="submit" onClick={handleSubmit} />
      </div>}
      <button onClick={logoutLiff} >ログアウト</button>
    </div>
  );
};
