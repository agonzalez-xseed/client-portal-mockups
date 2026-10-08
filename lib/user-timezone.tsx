"use client";

import { createContext, useContext, useState } from "react";
import type { UserTimezone } from "@/lib/team";

type UserTimezoneContextValue = {
  zone: UserTimezone;
  setZone: (zone: UserTimezone) => void;
};

const UserTimezoneContext = createContext<UserTimezoneContextValue | null>(null);

export function UserTimezoneProvider({ children }: { children: React.ReactNode }) {
  const [zone, setZone] = useState<UserTimezone>("EST");

  return (
    <UserTimezoneContext.Provider value={{ zone, setZone }}>
      {children}
    </UserTimezoneContext.Provider>
  );
}

export function useUserTimezone() {
  const context = useContext(UserTimezoneContext);
  if (!context) {
    throw new Error("useUserTimezone must be used inside UserTimezoneProvider");
  }
  return context;
}
