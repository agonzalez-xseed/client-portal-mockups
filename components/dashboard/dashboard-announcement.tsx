"use client";

import { useState } from "react";
import { AnnouncementBanner } from "@xseeduy/ui/base";
import type { PortalAnnouncement } from "@/components/portal-nav";

/**
 * Mobile dashboard banner. `onDismiss` only draws the X; the banner stays
 * mounted until this removes it.
 */
export function DashboardAnnouncement({
  announcement,
}: {
  announcement: PortalAnnouncement;
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <AnnouncementBanner
      {...announcement}
      className="md:hidden"
      onDismiss={() => setVisible(false)}
    />
  );
}
