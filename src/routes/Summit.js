import React, { useContext, useState } from "react";
import { SummitMain } from "../components/SummitMain";
import { SummitPending } from "../components/SummitPending";
import { SummitCreate } from "../components/SummitCreate";
import { WebAppWrapper } from "../components/WebAppWrapper";
import { UserInfoContext } from "../components/UserInfoProvider";

export const Summit = () => {
  const [view, setView] = useState("pending");
  const [isInvited, setIsInvited] = useState(true);
  const { summitStatus } = useContext(UserInfoContext);
  if (summitStatus.affiliation) setView("main");
  if (summitStatus.InvitationStatus) setIsInvited(true);

  const switchView = () => setView(view === "pending" ? "create" : "pending");
  return (
    <WebAppWrapper title="サミットモード">
      {view === "pending" && (
        <SummitPending setCreate={switchView} isInvited={isInvited} />
      )}
      {view === "main" && <SummitMain />}
      {view === "create" && <SummitCreate setPending={switchView} />}
    </WebAppWrapper>
  );
};
