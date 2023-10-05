import React from "react";
import { Block } from "../ui/Block";
import styles from "./Login.module.css";

export const Login = () => {
  return (
    <>
      <Block>
        <div>
          <h1>Asamit!アプリにログイン</h1>
          <p>
            アプリにログインすると自分の実績や複数人での朝活などの機能が解放されます！
          </p>
          <button>
            <img
              src="/images/btn_login_base.png"
              className={styles.btnlogin}
              alt="LINEでログイン"
            />
          </button>
        </div>
      </Block>
    </>
  );
};
