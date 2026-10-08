import type {
  SubteamCardProps,
  SubteamPerson,
  TeamMapMember,
} from "@xseeduy/ui/main";

export type HeadcountPoint = {
  /** ISO month, e.g. "2024-10". */
  month: string;
  headcount: number;
};

/** Cumulative headcount, Oct 2024 – Sep 2026. */
export const HEADCOUNT: HeadcountPoint[] = [
  { month: "2024-10", headcount: 1 },
  { month: "2024-11", headcount: 2 },
  { month: "2024-12", headcount: 3 },
  { month: "2025-01", headcount: 3 },
  { month: "2025-02", headcount: 3 },
  { month: "2025-03", headcount: 3 },
  { month: "2025-04", headcount: 3 },
  { month: "2025-05", headcount: 3 },
  { month: "2025-06", headcount: 2 },
  { month: "2025-07", headcount: 2 },
  { month: "2025-08", headcount: 2 },
  { month: "2025-09", headcount: 3 },
  { month: "2025-10", headcount: 4 },
  { month: "2025-11", headcount: 5 },
  { month: "2025-12", headcount: 6 },
  { month: "2026-01", headcount: 6 },
  { month: "2026-02", headcount: 10 },
  { month: "2026-03", headcount: 10 },
  { month: "2026-04", headcount: 10 },
  { month: "2026-05", headcount: 9 },
  { month: "2026-06", headcount: 9 },
  { month: "2026-07", headcount: 9 },
  { month: "2026-08", headcount: 9 },
  { month: "2026-09", headcount: 11 },
];

export const ACTIVE_HEADCOUNT = 11;

export const TENURE_BUCKETS = [
  { bucket: "<6 mo", members: 11 },
  { bucket: "6–12 mo", members: 6 },
  { bucket: "1–2 yr", members: 2 },
  { bucket: "2 yr+", members: 0 },
];

export const TENURE_AVG_MONTHS = 6.8;
export const TOTAL_MEMBERS = 19;

/** Monthly departures, May 2025 – Sep 2026 (YY-MM labels). */
export const DEPARTURES = [
  { month: "25-05", departures: 1 },
  { month: "25-06", departures: 1 },
  { month: "25-07", departures: 0 },
  { month: "25-08", departures: 0 },
  { month: "25-09", departures: 0 },
  { month: "25-10", departures: 0 },
  { month: "25-11", departures: 0 },
  { month: "25-12", departures: 0 },
  { month: "26-01", departures: 1 },
  { month: "26-02", departures: 1 },
  { month: "26-03", departures: 0 },
  { month: "26-04", departures: 0 },
  { month: "26-05", departures: 2 },
  { month: "26-06", departures: 0 },
  { month: "26-07", departures: 1 },
  { month: "26-08", departures: 0 },
  { month: "26-09", departures: 1 },
];

export const ATTRITION_RATE = 0.42;

/** Dummy headshots from randomuser.me. */
function portrait(gender: "men" | "women", n: number) {
  return `https://randomuser.me/api/portraits/${gender}/${n}.jpg`;
}

export const TEAM_MEMBERS: TeamMapMember[] = [
  { id: "m1", name: "Sofía Pereira", initials: "SP", role: "Frontend Engineer", country: "Uruguay", countryCode: "UY", coordinates: [-56.16, -34.9], avatarSrc: portrait("women", 44) },
  { id: "m2", name: "Martín Rodríguez", initials: "MR", role: "Backend Engineer", country: "Uruguay", countryCode: "UY", coordinates: [-56.16, -34.9], avatarSrc: portrait("men", 32) },
  { id: "m3", name: "Lucía Fernández", initials: "LF", role: "QA Analyst", country: "Uruguay", countryCode: "UY", coordinates: [-57.84, -34.47], avatarSrc: portrait("women", 65) },
  { id: "m4", name: "Diego Andrade", initials: "DA", role: "Full-stack Engineer", country: "Ecuador", countryCode: "EC", coordinates: [-78.47, -0.18], avatarSrc: portrait("men", 75) },
  { id: "m5", name: "Camila Vera", initials: "CV", role: "Product Designer", country: "Ecuador", countryCode: "EC", coordinates: [-79.9, -2.19], avatarSrc: portrait("women", 68) },
  { id: "m6", name: "Tomás Gutiérrez", initials: "TG", role: "Data Engineer", country: "Argentina", countryCode: "AR", coordinates: [-58.38, -34.6], avatarSrc: portrait("men", 46) },
  { id: "m7", name: "Valentina Ruiz", initials: "VR", role: "Mobile Engineer", country: "Argentina", countryCode: "AR", coordinates: [-64.18, -31.42], avatarSrc: portrait("women", 17) },
  { id: "m8", name: "Rafael Souza", initials: "RS", role: "DevOps Engineer", country: "Brazil", countryCode: "BR", coordinates: [-46.63, -23.55], avatarSrc: portrait("men", 52) },
  { id: "m9", name: "Beatriz Lima", initials: "BL", role: "Frontend Engineer", country: "Brazil", countryCode: "BR", coordinates: [-47.88, -15.79], avatarSrc: portrait("women", 29) },
  { id: "m10", name: "Carlos Mejía", initials: "CM", role: "Backend Engineer", country: "Honduras", countryCode: "HN", coordinates: [-87.2, 14.07], avatarSrc: portrait("men", 22) },
  { id: "m11", name: "Andrea Quispe", initials: "AQ", role: "Scrum Master", country: "Peru", countryCode: "PE", coordinates: [-77.04, -12.05], avatarSrc: portrait("women", 90) },
];

export type Subteam = Pick<SubteamCardProps, "name" | "manager" | "members"> & {
  id: string;
};

function membersById(ids: string[]): SubteamPerson[] {
  return ids.map((id) => {
    const member = TEAM_MEMBERS.find((m) => m.id === id);
    if (!member) throw new Error(`Unknown team member: ${id}`);
    return {
      id: member.id,
      name: member.name,
      role: member.role ?? "",
      initials: member.initials ?? "",
      avatarSrc: member.avatarSrc,
    };
  });
}

export const SUBTEAMS: Subteam[] = [
  {
    id: "frontend",
    name: "Frontend",
    members: membersById(["m1", "m9", "m7"]),
    manager: { id: "l1", name: "Laura Méndez", role: "Engineering Manager", initials: "LM", avatarSrc: portrait("women", 50) },
  },
  {
    id: "backend-devops",
    name: "Backend & DevOps",
    members: membersById(["m2", "m4", "m6", "m8"]),
    manager: { id: "l2", name: "Patrick Majewski", role: "VP of Engineering", initials: "PM", avatarSrc: portrait("men", 11) },
  },
  {
    id: "design-qa",
    name: "Design & QA",
    members: membersById(["m5", "m3", "m11"]),
    manager: { id: "l3", name: "Javier Ortiz", role: "Head of Product", initials: "JO", avatarSrc: portrait("men", 64) },
  },
];
