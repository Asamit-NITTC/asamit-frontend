import React from "react";
import { WebAppWrapper } from "../components/WebAppWrapper";
//import { useLocation } from "react-router-dom";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;
//const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffHome = () => {
  return (
    <WebAppWrapper title="ホーム">
      <div>
        <p>ホームです</p>
      </div>
    </WebAppWrapper>
  );
};
