import React, { useState, useEffect } from "react";
import liff from "@line/liff";

export const IdToken = () => {
  const [profile, setProfile] = useState("");
  const [idToken, setIdToken] = useState("");
  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });

    } catch (err) {
      console.log("Failed to init liff");
    }
  };
  const getUserProfile = async () => {
    try {
      const profile = await liff.getProfile();
      setProfile(profile);
    } catch (err) {
      console.log("Failed to get profile.");
    }
    if (!liff.isLoggedIn()) {
      liff.login({});
    }
  };

  useEffect(() => {
    (async () => {
      await initLiff();
      const gotIdToken = liff.getIDToken();
      setIdToken(gotIdToken);
      await getUserProfile();
    })();
  }, []);

  return (
    <div className="main">
      <p>{ idToken }</p>
      <img src={profile.pictureUrl} alt="アイコン画像" />
      <h2>こんにちは！{profile.displayName}さん！</h2>
      <p>累計ポイント: 0pt</p>
      <p>連続起床日数: 0日</p>
    </div>
  );
};
