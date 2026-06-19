export type Status = "Done" | "Working on it" | "Stuck" | "Not started";
export type Priority = "Critical" | "High" | "Medium" | "Low";

export const statusColor: Record<Status, string> = {
  Done: "var(--color-status-done)",
  "Working on it": "var(--color-status-working)",
  Stuck: "var(--color-status-stuck)",
  "Not started": "var(--color-status-blank)",
};

export const priorityColor: Record<Priority, string> = {
  Critical: "#401694",
  High: "#5559df",
  Medium: "#579bfc",
  Low: "#9d99b9",
};

export type Person = { id: string; name: string; color: string };

export const people: Person[] = [
  { id: "ad", name: "Ada Levin", color: "#ff5ac4" },
  { id: "ko", name: "Kofi Owusu", color: "#00c875" },
  { id: "mi", name: "Mira Shah", color: "#579bfc" },
  { id: "le", name: "Leo Park", color: "#fdab3d" },
  { id: "na", name: "Nora Diaz", color: "#a25ddc" },
  { id: "ja", name: "Jonas Roy", color: "#009eb5" },
];

export type Task = {
  id: string;
  name: string;
  owners: string[];
  status: Status;
  priority: Priority;
  due: string;
  timeline: [number, number]; // % start, % width across the quarter bar
  progress: number; // 0..100
  budget: string;
};

export type Group = {
  id: string;
  title: string;
  color: string;
  collapsed?: boolean;
  tasks: Task[];
};

export const board: Group[] = [
  {
    id: "g1",
    title: "Discovery & research",
    color: "var(--color-pulse-purple)",
    tasks: [
      {
        id: "t1",
        name: "Stakeholder interviews",
        owners: ["ad", "mi"],
        status: "Done",
        priority: "High",
        due: "Apr 12",
        timeline: [2, 16],
        progress: 100,
        budget: "$4,200",
      },
      {
        id: "t2",
        name: "Competitive teardown",
        owners: ["le"],
        status: "Done",
        priority: "Medium",
        due: "Apr 18",
        timeline: [10, 14],
        progress: 100,
        budget: "$1,800",
      },
      {
        id: "t3",
        name: "Synthesize insight report",
        owners: ["na", "ad"],
        status: "Working on it",
        priority: "High",
        due: "Apr 26",
        timeline: [18, 12],
        progress: 65,
        budget: "$2,400",
      },
    ],
  },
  {
    id: "g2",
    title: "Design & prototype",
    color: "var(--color-pulse-blue)",
    tasks: [
      {
        id: "t4",
        name: "Wireframe core flows",
        owners: ["mi"],
        status: "Working on it",
        priority: "Critical",
        due: "May 03",
        timeline: [26, 16],
        progress: 48,
        budget: "$6,000",
      },
      {
        id: "t5",
        name: "Hi-fi component library",
        owners: ["le", "ja"],
        status: "Stuck",
        priority: "Critical",
        due: "May 09",
        timeline: [34, 14],
        progress: 22,
        budget: "$8,500",
      },
      {
        id: "t6",
        name: "Usability test round 1",
        owners: ["na"],
        status: "Not started",
        priority: "Medium",
        due: "May 16",
        timeline: [44, 12],
        progress: 0,
        budget: "$3,100",
      },
    ],
  },
  {
    id: "g3",
    title: "Build & launch",
    color: "var(--color-pulse-teal)",
    tasks: [
      {
        id: "t7",
        name: "Front-end implementation",
        owners: ["ko", "ja"],
        status: "Working on it",
        priority: "High",
        due: "Jun 06",
        timeline: [52, 22],
        progress: 35,
        budget: "$14,000",
      },
      {
        id: "t8",
        name: "QA & accessibility pass",
        owners: ["ko"],
        status: "Not started",
        priority: "High",
        due: "Jun 20",
        timeline: [70, 12],
        progress: 0,
        budget: "$4,800",
      },
      {
        id: "t9",
        name: "Go-to-market launch",
        owners: ["ad", "na", "le"],
        status: "Not started",
        priority: "Critical",
        due: "Jun 30",
        timeline: [80, 16],
        progress: 0,
        budget: "$22,000",
      },
    ],
  },
];

export const quarters = ["Apr", "May", "Jun"];
