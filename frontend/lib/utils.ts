import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const isNullOrUndefined = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

