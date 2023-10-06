import React, { useState } from "react";
import { SummitMain } from "../components/SummitMain";
import { SummitPending } from "../components/SummitPending";
import { SummitCreate } from "../components/SummitCreate";
import { WebAppWrapper } from "../components/WebAppWrapper";
//import { useLocation } from "react-router-dom";
//import axios from "axios";
//const BASE_URL = process.env.BASE_URL;
//const DEBUG = process.env.DEBUG === "TRUE" ? true : false;

export const LiffSummit = () => {
  const [summitStatus] = useState("create"); // pending, main, create
  return (
    <WebAppWrapper title="サミットモード">
      {summitStatus === "pending" && <SummitPending />}
      {summitStatus === "main" && <SummitMain />}
      {summitStatus === "create" && <SummitCreate />}
    </WebAppWrapper>
  );
};
