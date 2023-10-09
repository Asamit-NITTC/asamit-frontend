import React, { useContext } from "react";

import { Header } from "../ui/Header";
import { Footer } from "../ui/Footer";
import { Login } from "../ui/Login";
import { LiffObjectContext } from "./LiffObjectProvider";

export const WebAppWrapper = ({ title, children, ...props }) => {
  const { isLoggedIn, login } = useContext(LiffObjectContext);

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
