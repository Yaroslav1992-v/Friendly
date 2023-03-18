import { LikeData } from "../props/props";

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
