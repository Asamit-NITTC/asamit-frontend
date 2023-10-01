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

import { IdToken } from "./IdToken";
import { Profile } from "./routes/Profile";
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
        <Route path="/liff/" element={<LiffRoot />} />
        <Route path="/liff/main" element={<LiffProfile />} />
        <Route path="/liff/wakeup" element={<LiffWakeUp uid={cookies.uid} setCookieUid={setCookieUid} />} />
        <Route path="/liff/signup" element={<LiffSignUp setCookieUid={setCookieUid} />} />
        <Route path="/liff/setTime" element={<LiffSetTime uid={cookies.uid} setCookieUid={setCookieUid} />} />
        <Route path="/liff/feedback" element={<LiffFeedback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
