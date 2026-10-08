import type { TeamMapMember, TeamMemberStatus } from "@xseeduy/ui/main";
import { SUBTEAMS } from "@/lib/dashboard";

export type SubteamId = "frontend" | "backend-devops" | "design-qa";

export type TeamRosterMember = {
  id: string;
  subteamId: SubteamId;
  name: string;
  role: string;
  country: string;
  /** ISO 3166-1 alpha-2. */
  countryCode: string;
  contract: TeamMemberStatus;
  /** Display start month, e.g. "Jan 2026". */
  since: string;
  /** ISO month used for sorting. */
  sinceIso: string;
  city: string;
  /** Short offset, e.g. "GMT-5". */
  gmt: string;
  /** Monthly rate in USD. */
  rate: number;
  avatarSrc: string;
};

function portrait(n: number) {
  return `https://randomuser.me/api/portraits/men/${n}.jpg`;
}

export const TEAM_ROSTER: TeamRosterMember[] = [
  { id: "t1", subteamId: "backend-devops", name: "Giovanni Capote", role: "Ssr DevOps", country: "Ecuador", countryCode: "EC", contract: "Full Time", since: "Jan 2026", sinceIso: "2026-01", city: "Guayaquil", gmt: "GMT-5", rate: 5000, avatarSrc: portrait(12) },
  { id: "t2", subteamId: "frontend", name: "Jose Fiallos", role: "Sr Full Stack", country: "Honduras", countryCode: "HN", contract: "Full Time", since: "Feb 2026", sinceIso: "2026-02", city: "Tegucigalpa", gmt: "GMT-6", rate: 7000, avatarSrc: portrait(15) },
  { id: "t3", subteamId: "design-qa", name: "Rodrigo Antognazza", role: "Sr QA Lead", country: "Uruguay", countryCode: "UY", contract: "Full Time", since: "May 2025", sinceIso: "2025-05", city: "Montevideo", gmt: "GMT-3", rate: 8500, avatarSrc: portrait(18) },
  { id: "t4", subteamId: "backend-devops", name: "Exequiel Peinado", role: "IT Administrator", country: "Argentina", countryCode: "AR", contract: "Full Time", since: "Dec 2025", sinceIso: "2025-12", city: "Buenos Aires", gmt: "GMT-3", rate: 5000, avatarSrc: portrait(24) },
  { id: "t5", subteamId: "design-qa", name: "Joao Marcos", role: "AI/ML", country: "Brazil", countryCode: "BR", contract: "Hourly", since: "Feb 2026", sinceIso: "2026-02", city: "Sao Paulo", gmt: "GMT-3", rate: 8000, avatarSrc: portrait(28) },
  { id: "t6", subteamId: "design-qa", name: "Gustavo Puente", role: "Configuration Manager", country: "Ecuador", countryCode: "EC", contract: "Full Time", since: "Nov 2024", sinceIso: "2024-11", city: "Guayaquil", gmt: "GMT-5", rate: 7000, avatarSrc: portrait(36) },
  { id: "t7", subteamId: "backend-devops", name: "Carlos Chanta", role: "Sr DevOps Engineer", country: "Peru", countryCode: "PE", contract: "Full Time", since: "Sep 2026", sinceIso: "2026-09", city: "Lima", gmt: "GMT-5", rate: 7500, avatarSrc: portrait(41) },
  { id: "t8", subteamId: "design-qa", name: "Arturo Martinez", role: "Sr QA Engineer", country: "Uruguay", countryCode: "UY", contract: "Full Time", since: "May 2026", sinceIso: "2026-05", city: "Montevideo", gmt: "GMT-3", rate: 6000, avatarSrc: portrait(47) },
  { id: "t9", subteamId: "frontend", name: "Mauricio Pastorino", role: "Sr Full Stack", country: "Uruguay", countryCode: "UY", contract: "Full Time", since: "Jul 2026", sinceIso: "2026-07", city: "Montevideo", gmt: "GMT-3", rate: 7000, avatarSrc: portrait(53) },
  { id: "t10", subteamId: "backend-devops", name: "Rodolfo da Silva", role: "Sr DevOps", country: "Brazil", countryCode: "BR", contract: "Full Time", since: "Sep 2026", sinceIso: "2026-09", city: "New York", gmt: "GMT-4", rate: 7000, avatarSrc: portrait(59) },
  { id: "t11", subteamId: "backend-devops", name: "Simon Malave", role: "DevOps", country: "Venezuela", countryCode: "VE", contract: "Hourly", since: "Aug 2026", sinceIso: "2026-08", city: "Caracas", gmt: "GMT-4", rate: 6500, avatarSrc: portrait(67) },
];

export const formatRate = (rate: number) => `$${rate}/mo`;

export const getMember = (id: string) => TEAM_ROSTER.find((m) => m.id === id);

/** WGS84 [longitude, latitude] for each roster city, used by TeamMap. */
const CITY_COORDINATES: Record<string, [number, number]> = {
  Guayaquil: [-79.89, -2.17],
  Tegucigalpa: [-87.2, 14.07],
  Montevideo: [-56.16, -34.9],
  "Buenos Aires": [-58.38, -34.6],
  "Sao Paulo": [-46.63, -23.55],
  Lima: [-77.04, -12.05],
  "New York": [-74.0, 40.71],
  Caracas: [-66.9, 10.48],
};

export function toMapMember(m: TeamRosterMember): TeamMapMember {
  const coordinates = CITY_COORDINATES[m.city];
  if (!coordinates) throw new Error(`No coordinates for city: ${m.city}`);
  return {
    id: m.id,
    name: m.name,
    role: m.role,
    country: m.country,
    countryCode: m.countryCode,
    coordinates,
    avatarSrc: m.avatarSrc,
  };
}

export function managerFor(member: TeamRosterMember) {
  const subteam = SUBTEAMS.find((team) => team.id === member.subteamId);
  if (!subteam) throw new Error(`Unknown sub-team: ${member.subteamId}`);
  return { manager: subteam.manager, subteam: subteam.name };
}

/** Whole months from the start month to the current month. */
function tenureMonths(sinceIso: string, now = new Date()) {
  const [year, month] = sinceIso.split("-").map(Number);
  return Math.max(0, (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month));
}

/** "1 yr 11 mo" */
export function formatTenure(sinceIso: string, now = new Date()) {
  return formatMonths(tenureMonths(sinceIso, now));
}

function formatMonths(months: number) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest} mo`;
  return rest === 0 ? `${years} yr` : `${years} yr ${rest} mo`;
}

export type PtoType = "Vacation" | "Sick leave" | "Personal";
export type PtoStatus = "Approved" | "Pending" | "Rejected";

export type PtoRecord = {
  id: string;
  type: PtoType;
  startIso: string;
  endIso: string;
  days: number;
  status: PtoStatus;
};

const PTO_POOL: Omit<PtoRecord, "id">[] = [
  { type: "Vacation", startIso: "2026-12-21", endIso: "2026-12-31", days: 8, status: "Pending" },
  { type: "Personal", startIso: "2026-10-16", endIso: "2026-10-16", days: 1, status: "Approved" },
  { type: "Sick leave", startIso: "2026-09-08", endIso: "2026-09-09", days: 2, status: "Approved" },
  { type: "Vacation", startIso: "2026-07-13", endIso: "2026-07-24", days: 10, status: "Approved" },
  { type: "Personal", startIso: "2026-05-04", endIso: "2026-05-04", days: 1, status: "Rejected" },
  { type: "Vacation", startIso: "2026-03-30", endIso: "2026-04-03", days: 5, status: "Approved" },
  { type: "Sick leave", startIso: "2026-02-11", endIso: "2026-02-11", days: 1, status: "Approved" },
  { type: "Vacation", startIso: "2025-12-22", endIso: "2026-01-02", days: 8, status: "Approved" },
  { type: "Vacation", startIso: "2025-08-04", endIso: "2025-08-15", days: 10, status: "Approved" },
  { type: "Sick leave", startIso: "2025-06-17", endIso: "2025-06-18", days: 2, status: "Approved" },
  { type: "Vacation", startIso: "2025-03-17", endIso: "2025-03-21", days: 5, status: "Approved" },
];

/** Dummy PTO history: pool entries after the member's start, thinned per member for variety. */
export function ptoHistoryFor(member: TeamRosterMember): PtoRecord[] {
  const seed = TEAM_ROSTER.indexOf(member);
  return PTO_POOL.filter(
    (entry, index) =>
      entry.startIso.slice(0, 7) >= member.sinceIso && (index + seed) % 3 !== 0,
  ).map((entry, index) => ({ ...entry, id: `${member.id}-pto-${index}` }));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const parseIso = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, monthDay: `${MONTHS[month - 1]} ${day}` };
};

/**
 * "Jul 13 – Jul 24, 2026", or a single date for one-day requests.
 * Built by hand because Intl range output differs between Node and browsers (hydration mismatch).
 */
export function formatPtoRange({ startIso, endIso }: PtoRecord) {
  const start = parseIso(startIso);
  const end = parseIso(endIso);
  if (startIso === endIso) return `${start.monthDay}, ${start.year}`;
  if (start.year === end.year) return `${start.monthDay} – ${end.monthDay}, ${end.year}`;
  return `${start.monthDay}, ${start.year} – ${end.monthDay}, ${end.year}`;
}

/** Fixed standard-time UTC offsets; daylight saving is not applied. */
export const USER_TIMEZONES = { EST: -5, CST: -6, PST: -8 } as const;

export type UserTimezone = keyof typeof USER_TIMEZONES;

export const utcOffset = (m: TeamRosterMember) => Number(m.gmt.replace("GMT", ""));

/** "EST +2 hrs" — positive when the member is ahead of the user. */
export function formatTimeShift(m: TeamRosterMember, zone: UserTimezone) {
  const diff = utcOffset(m) - USER_TIMEZONES[zone];
  const sign = diff > 0 ? "+" : diff < 0 ? "-" : "";
  const hours = Math.abs(diff);
  return `${zone} ${sign}${hours} ${hours === 1 ? "hr" : "hrs"}`;
}
