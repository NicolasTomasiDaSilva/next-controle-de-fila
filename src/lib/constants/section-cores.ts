export const sectionCores: Record<string, Cor> = {
  blue: {
    border: "border-blue-300",
    bg: "bg-blue-100",
    bg500: "bg-blue-500",
    text: "text-blue-500",
  },
  red: {
    border: "border-red-300",
    bg: "bg-red-100",
    bg500: "bg-red-500",
    text: "text-red-500",
  },
  green: {
    border: "border-green-300",
    bg: "bg-green-100",
    bg500: "bg-green-500",
    text: "text-green-500",
  },
  purple: {
    border: "border-purple-300",
    bg: "bg-purple-100",
    bg500: "bg-purple-500",
    text: "text-purple-500",
  },
  cyan: {
    border: "border-cyan-300",
    bg: "bg-cyan-100",
    bg500: "bg-cyan-500",
    text: "text-cyan-500",
  },
  indigo: {
    border: "border-indigo-300",
    bg: "bg-indigo-100",
    bg500: "bg-indigo-500",
    text: "text-indigo-500",
  },
  yellow: {
    border: "border-yellow-300",
    bg: "bg-yellow-100",
    bg500: "bg-yellow-500",
    text: "text-yellow-500",
  },
  orange: {
    border: "border-orange-300",
    bg: "bg-orange-100",
    bg500: "bg-orange-500",
    text: "text-orange-500",
  },
};

export type Cor = {
  border: string;
  bg: string;
  bg500: string;
  text: string;
};
