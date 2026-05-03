export type ElectionEventType = 'Assembly' | 'Lok Sabha' | 'History' | 'Key Date';

export interface ElectionEvent {
  id: string;
  date: string; // YYYY-MM-DD format
  title: string;
  type: ElectionEventType;
  state?: string;
  description: string;
}

export const ELECTION_EVENTS: ElectionEvent[] = [
  // 2026 Assembly
  {
    id: "asm-kerala-2026",
    date: "2026-04-09",
    title: "Kerala Assembly Polling",
    type: "Assembly",
    state: "Kerala",
    description: "140 Assembly Seats"
  },
  {
    id: "asm-assam-2026",
    date: "2026-04-09",
    title: "Assam Assembly Polling",
    type: "Assembly",
    state: "Assam",
    description: "126 Assembly Seats"
  },
  {
    id: "asm-puducherry-2026",
    date: "2026-04-09",
    title: "Puducherry Assembly Polling",
    type: "Assembly",
    state: "Puducherry",
    description: "30 Assembly Seats"
  },
  {
    id: "asm-tn-2026",
    date: "2026-04-23",
    title: "Tamil Nadu Assembly Polling",
    type: "Assembly",
    state: "Tamil Nadu",
    description: "234 Assembly Seats"
  },
  {
    id: "asm-wb-1-2026",
    date: "2026-04-23",
    title: "West Bengal Phase I Polling",
    type: "Assembly",
    state: "West Bengal",
    description: "Phase 1 / 294 Seats"
  },
  {
    id: "asm-wb-2-2026",
    date: "2026-04-29",
    title: "West Bengal Phase II Polling",
    type: "Assembly",
    state: "West Bengal",
    description: "Phase 2 / 294 Seats"
  },
  {
    id: "asm-counting-2026",
    date: "2026-05-04",
    title: "State Assembly Vote Counting",
    type: "Key Date",
    description: "Results declared for Kerala, Assam, Puducherry, Tamil Nadu, and West Bengal."
  },
  {
    id: "bypoll-wb-2026",
    date: "2026-05-21",
    title: "Falta Repolling",
    type: "Assembly",
    state: "West Bengal",
    description: "Fresh repolling ordered across 285 polling stations."
  },
  // Upcoming / Historical / Other
  {
    id: "ls-1951-start",
    date: "1951-10-25",
    title: "First General Election Begins",
    type: "History",
    description: "Start of the first post-independence Lok Sabha elections."
  },
  {
    id: "ls-1952-end",
    date: "1952-02-21",
    title: "First General Election Concludes",
    type: "History",
    description: "End of the first Lok Sabha elections."
  },
  {
    id: "presidential-2027",
    date: "2027-07-15", // Estimated
    title: "Presidential Election (Estimated)",
    type: "Key Date",
    description: "Electoral College to elect the President of India."
  }
];

export const STATES_LIST = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman & Nicobar", "Chandigarh", "Dadra & Nagar Haveli", "Daman & Diu",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
].sort();
