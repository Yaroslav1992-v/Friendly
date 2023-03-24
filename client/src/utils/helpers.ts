import { LikeData, Message } from "../props/props";

type NumberToString = "one" | "two" | "three" | "four" | "five" | "six";
export function numberToString(num: number): NumberToString {
  switch (num) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    default:
      throw new Error("Number must be between 1 and 6");
  }
}
export function splitArray<T>(array: T[], size: number): T[][] {
  const result: any[][] = [];

  const numChunks = Math.ceil(array.length / size);
  for (let i = 0; i < numChunks; i++) {
    result.push(array.slice(i * size, (i + 1) * size));
  }
  return result;
}
export function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.round(diffMs / (1000 * 60));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins <= 59) {
    return `${diffMins} minutes ago`;
  } else if (diffHours <= 23) {
    return `${diffHours} hours ago`;
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`;
  } else {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  }
}
export function getReadableDate(dateStr: Date): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) {
    return "Today";
  } else if (days === 1) {
    return "Yesterday";
  } else if (days <= 6) {
    return `${days} days ago`;
  } else if (days <= 13) {
    return "1 week ago";
  } else {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  }
}
export function formatTime(dateStr: Date): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
export const checkIfLiked = (
  parentId: string,
  userId: string,
  likes: LikeData[]
) => {
  const check = likes.find(
    (l) => l.parentId === parentId && userId === l.author
  );
  return check?._id ? check._id : false;
};
export const likesCount = (parentId: string, likes: LikeData[]) => {
  let count = 0;
  likes.forEach((obj) => {
    if (obj.parentId === parentId) {
      count++;
    }
  });
  return count;
};
export function checkString(substring: string, str: string): boolean {
  if (!substring) {
    return false;
  }
  for (let i = 0; i < substring.length; i++) {
    if (substring[i].toLowerCase() !== str[i].toLowerCase()) {
      return false;
    }
  }

  return true;
}
export function groupMessagesByDate(messages: Message[]): Message[][] {
  const groups: { [key: string]: Message[] } = {};
  messages.forEach((message) => {
    const date = new Date(message.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
  });

  return Object.values(groups);
}
