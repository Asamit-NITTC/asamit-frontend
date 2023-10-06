import React from "react";
import { WebAppWrapper } from "../components/WebAppWrapper";
//import { LiffObjectContext } from "../components/LiffObjectProvider";
//import { useLocation } from "react-router-dom";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;
//const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const Summit = () => {
  //const { liffObject } = useContext(LiffObjectContext);
  return (
    <WebAppWrapper title="サミットモード">
      <p>サミットモード</p>
    </WebAppWrapper>
  );
};
