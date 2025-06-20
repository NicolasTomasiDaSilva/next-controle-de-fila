import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function intensificarCor(
  classe: string,
  novaIntensidade: string = "500"
): string {
  return classe.replace(/-\d{3}$/, `-${novaIntensidade}`);
}
