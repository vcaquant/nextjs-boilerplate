import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isObjectEmpty(obj: Object) {
  return Object.keys(obj).length === 0;
}

export const getMinutes = (time: number) => {
  return Math.floor(time / 60);
};

export const getSeconds = (time: number) => {
  return time % 60;
};

export const getFormattedTime = (time: number | undefined) => {
  if (!time) {
    return "00:00";
  }

  return `${getMinutes(time).toString().padStart(2, "0")}:${getSeconds(time)
    .toString()
    .padStart(2, "0")}`;
};
