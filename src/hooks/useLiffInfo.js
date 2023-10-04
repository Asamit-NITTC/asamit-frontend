import { useState, useEffect } from "react";

export const useLiffInfo = (liffObject, isLoggedIn) => {
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        try {
          const gotIdToken = liffObject?.getIDToken();
          setIdToken(gotIdToken);
          const profile = await liffObject?.getProfile();
          setDisplayName(profile.displayName);
          setPictureUrl(profile.pictureUrl);
        } catch (err) {
          console.error({ err });
        }
      }
    })();
  }, [liffObject, isLoggedIn]);

  return {
    displayName,
    pictureUrl,
    idToken,
  };
};
