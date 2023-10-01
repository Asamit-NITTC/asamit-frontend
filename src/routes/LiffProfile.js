import React, { useState, useEffect } from "react";
//import { useLocation } from "react-router-dom";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;
//const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

import liff from "@line/liff/core";
import GetProfile from "@line/liff/get-profile";
liff.use(new GetProfile());

export const LiffProfile = () => {
  const [profile, setProfile] = useState("");
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
  };

  useEffect(() => {
    (async () => {
      await initLiff();
      await getUserProfile();
    })();
  }, []);

  return (
    <div className="main">
      <img src={profile.pictureUrl} alt="アイコン画像" />
      <h2>こんにちは！{profile.displayName}さん！</h2>
      <p>累計ポイント: 0pt</p>
      <p>連続起床日数: 0日</p>
    </div>
  );
};
