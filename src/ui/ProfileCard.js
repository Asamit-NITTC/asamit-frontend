import React from "react";
import { Block } from "../ui/Block";
import styles from "./ProfileCard.module.css";
import { ProfilePic } from "./ProfilePic";
import { MdLogout } from "react-icons/md";

export const ProfileCard = ({ pictureUrl, userInfo, logoutBtn }) => {
  return (
    <>
      <Block>
        <div className={styles.content}>
          <div className={styles.logout}>
            <button onClick={logoutBtn}>
              <MdLogout size="2.5rem" />
            </button>
          </div>
          <ProfilePic pictureUrl={pictureUrl} />
          <div className={styles.username}>
            <p>表示名:</p>
            <h4 className={styles.disp}>{userInfo.name || "-"}</h4>
          </div>
          <p className={styles.uid}>ID: {localStorage.getItem("uid")}</p>
          <div className={styles.userpoint}>
            <p>累計ポイント:</p>
            <h3 className="disp">{String(userInfo.point) || "-"} pt</h3>
          </div>
          <p className="userrecord disp">
            {String(userInfo.duration) || "-"} 日連続中
          </p>
        </div>
      </Block>
    </>
  );
};
