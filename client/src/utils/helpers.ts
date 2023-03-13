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
