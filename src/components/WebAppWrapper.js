import React from "react";

import { Header } from "../ui/Header";
import { Footer } from "../ui/Footer";
import { Login } from "../components/Login";

//const { isLoggedIn, login, logout } = useLiff();

export const WebAppWrapper = ({ title, children, ...props }) => {
  return (
    <div {...props}>
      <Header title={title} />
      <main>
        <Login />
        {children}
      </main>
      <Footer />
    </div>
  );
};
