import React from "react";

import { Header } from "../ui/Header";
import { Footer } from "../ui/Footer";
import { Login } from "../ui/Login";
import { useLiff } from "../hooks/useLiff";

export const WebAppWrapper = ({ title, children, ...props }) => {
  const { isLoggedIn, login } = useLiff();

  return (
    <div {...props}>
      <Header title={title} />
      <main>
        {!isLoggedIn && <Login login={login} />}
        {isLoggedIn && children}
      </main>
      <Footer />
    </div>
  );
};
