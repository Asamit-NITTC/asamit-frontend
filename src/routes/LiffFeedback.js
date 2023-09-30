import React, { useEffect, useState } from "react";
import liff from "@line/liff";

export const LiffFeedback = () => {
  const [post, setPost] = useState("");
  const initLiff = async () => {
    try {
      await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
    } catch (err) {
      console.log("Failed to init liff");
    }
  };

  const handleTextChange = (event) => {
    const currentVal = event.target.value;
    setPost(currentVal);
  };

  const handleSubmit = () => {
    const postFinal = post;
    liff.sendMessages([
      {
        type: "text",
        text: "feedback>> " + postFinal,
      },
    ]);
  };

  useEffect(() => {
    (async () => {
      await initLiff();
    })();
  }, []);

  return (
    <div className="main">
      <div className="block">
        <p className="goal">
          <label htmlFor="goal">問い合わせフォーム</label>
          <textarea
            name="message"
            id="goal"
            value={post}
            onChange={handleTextChange}
          />
        </p>
        <p className="goal submit">
          <input onClick={handleSubmit} type="submit" value="feedbackを送信" />
        </p>
      </div>
    </div>
  );
};
