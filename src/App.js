import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { LiffRoot } from "./LiffRoot";
import { LiffWakeUp } from "./routes/LiffWakeUp";
import { LiffReview } from "./routes/LiffReview";
import { LiffSignUp } from "./routes/LiffSignUp";

import { Liff } from "./routes/Liff";
import { Profile } from "./routes/Profile";
import { NotFound } from "./routes/NotFound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-id-token" element={<Liff />} />

        <Route path="/liff/" element={<LiffRoot />} />
        <Route path="/liff/main" element={<Liff />} />
        <Route path="/liff/wakeup" element={<LiffWakeUp />} />
        <Route path="/liff/review" element={<LiffReview />} />
        <Route path="/liff/signup" element={<LiffSignUp />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
