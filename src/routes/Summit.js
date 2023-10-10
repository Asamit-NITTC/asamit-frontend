import React, { useContext, useState } from "react";
import { SummitMain } from "../components/SummitMain";
import { SummitPending } from "../components/SummitPending";
import { SummitCreate } from "../components/SummitCreate";
import { WebAppWrapper } from "../components/WebAppWrapper";
import { UserInfoContext } from "../components/UserInfoProvider";
import { useSummit } from "../hooks/useSummit";
import { useSummitRoomInfo } from "../hooks/useSummitRoomInfo";

export const Summit = () => {
  const [view, setView] = useState("pending");
  const [isInvited, setIsInvited] = useState(false);
  const { summitStatus } = useContext(UserInfoContext);
  const [{ roomId }] = useSummit();
  const { roomInfo } = useSummitRoomInfo(roomId);
  if (summitStatus.affiliation) setView("main");
  if (summitStatus.Invitation) setIsInvited(true);

  const switchView = () => setView(view === "pending" ? "create" : "pending");
  /*
  useEffect(() => {
    if (summitStatus.affiliation || summitStatus.Invitation) {
    }
  */

  return (
    <WebAppWrapper title="サミットモード">
      {view === "pending" && (
        <SummitPending
          setCreate={switchView}
          isInvited={isInvited}
          roomInfo={roomInfo}
        />
      )}
      {view === "main" && <SummitMain roomInfo={roomInfo} />}
      {view === "create" && <SummitCreate setPending={switchView} />}
    </WebAppWrapper>
  );
};
