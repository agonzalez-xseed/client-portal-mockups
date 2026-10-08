"use client";

import { formatTimeShift, type TeamRosterMember } from "@/lib/team";
import { useUserTimezone } from "@/lib/user-timezone";

export function MemberTimeShift({ member }: { member: TeamRosterMember }) {
  const { zone } = useUserTimezone();
  return <>{formatTimeShift(member, zone)}</>;
}
