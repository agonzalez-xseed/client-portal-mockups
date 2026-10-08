"use client";

import { Badge } from "@xseeduy/ui/base";
import { STATUS_TONE, type TeamMemberStatus } from "@xseeduy/ui/main";

export function MemberStatusBadge({ status }: { status: TeamMemberStatus }) {
  return (
    <Badge tone={STATUS_TONE[status]} variant="subtle" dot>
      {status}
    </Badge>
  );
}
