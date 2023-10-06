import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { LiffObjectProvider } from "./components/LiffObjectProvider";
import App from "./App";
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CookiesProvider>
      <LiffObjectProvider>
        <App />
      </LiffObjectProvider>
    </CookiesProvider>
  </BrowserRouter>,
);
