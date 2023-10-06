import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LiffObjectProvider } from "./components/LiffObjectProvider";
import { UserInfoProvider } from "./components/UserInfoProvider";
import App from "./App";
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <LiffObjectProvider>
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    </LiffObjectProvider>
  </BrowserRouter>,
);
