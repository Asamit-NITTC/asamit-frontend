import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import styles from "./ProfilePic.module.css";

export const ProfilePic = ({ pictureUrl }) => {
  return (
    <>
      {pictureUrl && (
        <img src={pictureUrl} alt="プロフィール画像" className={styles.icon} />
      )}
      {!pictureUrl && (
        <BiSolidUserCircle size="10rem" className={styles.icon} />
      )}
    </>
  );
};
