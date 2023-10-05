import React from "react";
import { Block } from "../ui/Block";
import styles from "./Login.module.css";
//import btnImage from "../images/btn-login.png"

export const Login = ({ login }) => {
  return (
    <>
      <Block>
        <div>
          <h1>Asamit!アプリにログイン</h1>
          <p>
            アプリにログインすると自分の実績や複数人での朝活などの機能が解放されます！
          </p>
          <button onClick={login}>
            <img
              src={"https://i.gyazo.com/c99751638374e7bdf6e2fb15c9bee5c3.png"}
              className={styles.btnlogin}
              alt="LINEでログイン"
            />
          </button>
        </div>
      </Block>
    </>
  );
};
