export const sectionCores: Record<string, Cor> = {
  blue: {
    border: "border-blue-300",
    bg: "bg-blue-100",
    text: "text-blue-500",
  },
  red: {
    border: "border-red-300",
    bg: "bg-red-100",
    text: "text-red-500",
  },
  green: {
    border: "border-green-300",
    bg: "bg-green-100",
    text: "text-green-500",
  },
  purple: {
    border: "border-purple-300",
    bg: "bg-purple-100",
    text: "text-purple-500",
  },
  cyan: {
    border: "border-cyan-300",
    bg: "bg-cyan-100",
    text: "text-cyan-500",
  },
  indigo: {
    border: "border-indigo-300",
    bg: "bg-indigo-100",
    text: "text-indigo-500",
  },
  yellow: {
    border: "border-yellow-300",
    bg: "bg-yellow-100",
    text: "text-yellow-500",
  },
  orange: {
    border: "border-orange-300",
    bg: "bg-orange-100",
    text: "text-orange-500",
  },
};

export type Cor = {
  border: string;
  bg: string;
  text: string;
};
