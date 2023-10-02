import React from "react";
import { useLiff } from "../hooks/useLiff";
import { useLiffInfo } from "../hooks/useLiffInfo";
//import { useLocation } from "react-router-dom";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;
//const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffProfile = () => {
  const { liffObject, isLoggedIn } = useLiff();
  const { displayName, pictureUrl } = useLiffInfo(liffObject, isLoggedIn);
  console.log({ displayName });

  return (
    <div className="main">
      <img src={pictureUrl} alt="アイコン画像" />
      <h2>こんにちは！{displayName}さん！</h2>
      <p>累計ポイント: 0pt</p>
      <p>連続起床日数: 0日</p>
    </div>
  );
};
