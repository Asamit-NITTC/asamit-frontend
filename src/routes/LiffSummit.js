import React from "react";
import { SummitMain } from "../components/SummitMain";
import { SummitPending } from "../components/SummitPending";
import { WebAppWrapper } from "../components/WebAppWrapper";
//import { useLocation } from "react-router-dom";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;
//const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffSummit = () => {
  return (
    <WebAppWrapper title="サミットモード">
      <SummitPending />
      {false && <SummitMain />}
    </WebAppWrapper>
  );
};
