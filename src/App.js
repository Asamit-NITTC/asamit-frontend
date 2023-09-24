import React from "react";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Home } from "./routes/Home";
import { LiffRoot } from "./LiffRoot";
import { LiffWakeUp } from "./routes/LiffWakeUp";
import { LiffReview } from "./routes/LiffReview";
import { LiffSignUp } from "./routes/LiffSignUp";
import { LiffSetTime } from "./routes/LiffSetTime";

import { Liff } from "./routes/Liff";
import { Profile } from "./routes/Profile";
import { NotFound } from "./routes/NotFound";

const App = () => {
  const [cookies, setCookie] = useCookies(["uid"]);
  const setCookieUid = (uid) => {
    setCookie("uid", uid);
  };
  return (
    <div>
      <p>current_uid: { cookies.uid }</p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-id-token" element={<Liff />} />

        <Route path="/liff/" element={<LiffRoot />} />
        <Route path="/liff/main" element={<Liff />} />
        <Route path="/liff/wakeup" element={<LiffWakeUp uid={cookies.uid} />} />
        <Route path="/liff/review" element={<LiffReview uid={cookies.uid} />} />
        <Route path="/liff/signup" element={<LiffSignUp setCookieUid={setCookieUid} />} />
        <Route path="/liff/setTime" element={<LiffSetTime uid={cookies.uid} />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
