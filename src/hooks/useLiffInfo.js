import { useState, useEffect } from "react";

export const useLiffInfo = (liffObject, isLoggedIn) => {
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  /*
  (async () => {
    if (isLoggedIn) {
      try {
        const gotIdToken = liffObject?.getIDToken();
        setIdToken(gotIdToken);
        const profile = await liffObject?.getProfile();
        setDisplayName(profile.displayName);
        setPictureUrl(profile.pictureUrl);
        console.log({gotIdToken, profile})
      } catch (err) {
        console.error({ err });
      }
    }
  })();
  */

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        try {
          const gotIdToken = liffObject?.getIDToken();
          setIdToken(gotIdToken);
          const profile = await liffObject?.getProfile();
          setDisplayName(profile.displayName);
          setPictureUrl(profile.pictureUrl);
          console.log({ gotIdToken, profile });
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
