import React from "react";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Home } from "./routes/Home";
import { LiffRoot } from "./LiffRoot";
import { LiffSignUp } from "./routes/LiffSignUp";
import { LiffSetTime } from "./routes/LiffSetTime";
import { LiffWakeUp } from "./routes/LiffWakeUp";
import { LiffProfile } from "./routes/LiffProfile";
import { LiffFeedback } from "./routes/LiffFeedback";
import { LiffSummit } from "./routes/LiffSummit";
import { LiffHome } from "./routes/LiffHome";

import { IdToken } from "./IdToken";
import { NotFound } from "./routes/NotFound";

const DEBUG = process.env.DEBUG==="TRUE" ? true : false;
if (DEBUG) console.log("debug mode");

const App = () => {
  const [cookies, setCookie] = useCookies(["uid"]);
  const setCookieUid = (uid) => {
    setCookie("uid", uid);
  };
  return (
    <div>
      { DEBUG && <p>current_uid: { cookies.uid }</p> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/idtoken" element={<IdToken />} />
        <Route path="/app" element={<LiffRoot />} />
        <Route path="/app/summit" element={<LiffSummit />} />
        <Route path="/app/home" element={<LiffHome />} />
        <Route path="/app/main" element={<LiffProfile />} />

        <Route path="/app/wakeup" element={<LiffWakeUp uid={cookies.uid} setCookieUid={setCookieUid} />} />
        <Route path="/app/signup" element={<LiffSignUp setCookieUid={setCookieUid} />} />
        <Route path="/app/setTime" element={<LiffSetTime uid={cookies.uid} setCookieUid={setCookieUid} />} />
        <Route path="/app/feedback" element={<LiffFeedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
