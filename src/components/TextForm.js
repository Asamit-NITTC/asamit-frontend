import React from "react";
import { useFormData } from "../hooks/useFormData";
import { Button } from "../ui/Button";
import styles from "./TextArea.module.css";

export const TextForm = ({ btnText, submitAction }) => {
  const [post, handleTextChange] = useFormData();
  return (
    <>
      <textarea
        name="message"
        className={styles.base}
        value={post}
        onChange={handleTextChange}
      />
      <Button visual="primary" type="submit" onClick={() => submitAction(post)}>
        {btnText}
      </Button>
    </>
  );
};
