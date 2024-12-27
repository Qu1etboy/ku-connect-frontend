import { formatDistanceToNowStrict } from "date-fns";

export function formatShortDistanceToNow(date: Date | string) {
  // Get the strict distance as a string
  const distance = formatDistanceToNowStrict(date, { addSuffix: false });

  // Replace words with abbreviations
  return distance
    .replace("years", "y")
    .replace("year", "y")
    .replace("months", "mo")
    .replace("month", "mo")
    .replace("days", "d")
    .replace("day", "d")
    .replace("hours", "h")
    .replace("hour", "h")
    .replace("minutes", "m")
    .replace("minute", "m")
    .replace("seconds", "s")
    .replace("second", "s")
    .replace(" ", "");
}
