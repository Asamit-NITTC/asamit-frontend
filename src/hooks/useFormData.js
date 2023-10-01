import { useState } from "react";

export const useFormData = () => {
  const [post, setPost] = useState("");

  const handleTextChange = (event) => {
    const currentVal = event.target.value;
    setPost(currentVal);
  };

  return [post, handleTextChange];
};
