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

export function formatChatTime(date: Date | string) {
  const inputDate = new Date(date);
  const now = new Date();

  // if the date is today, show the time
  const isToday = inputDate.toDateString() === now.toDateString();
  if (isToday) {
    return inputDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // if the date is yesterday, show "Yesterday"
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = inputDate.toDateString() === yesterday.toDateString();
  if (isYesterday) {
    return "Yesterday";
  }

  // if the date is within this week, show the day of the week
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const isThisWeek = inputDate >= startOfWeek;

  if (isThisWeek) {
    return inputDate.toLocaleDateString([], { weekday: "short" });
  }

  // if the date is within this year, show the day/month
  if (inputDate.getFullYear() === now.getFullYear()) {
    return inputDate.toLocaleDateString([], {
      day: "numeric",
      month: "numeric",
    });
  }

  // if the date is not within this year, show the full date
  return inputDate.toLocaleDateString();
}
