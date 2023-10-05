import React from "react";
import { useLiff } from "../hooks/useLiff";
import { useLiffInfo } from "../hooks/useLiffInfo";
//import { useLocation } from "react-router-dom";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;
//const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffHome = () => {
  const { liffObject, isLoggedIn } = useLiff();
  const { displayName } = useLiffInfo(liffObject, isLoggedIn);
  console.log({ displayName });

  return (
    <div className="main">
      <h1>ホーム画面</h1>
    </div>
  );
};
