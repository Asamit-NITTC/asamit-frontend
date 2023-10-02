import { useState } from "react";

export const useLiffInfo = (liffObject, isLoggedIn) => {
  const [displayName, setDisplayName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  (async () => {
    if (isLoggedIn) {
      try {
        const profile = await liffObject?.getProfile();
        setDisplayName(profile.displayName);
        setPictureUrl(profile.pictureUrl);
      } catch (err) {
        console.error({ err });
      }
    }
  })();

  /*
  useEffect(() => {
    (async() => {
      if (isLoggedIn) {
      try {
        const profile = await liffObject?.getProfile();
        setDisplayName(profile.displayName);
        setPictureUrl(profile.pictureUrl);
      } catch(err) {
        console.error({ err })
      }
      }
    })();
  }, [isLoggedIn]);
  */

  return {
    displayName,
    pictureUrl,
  };
};
