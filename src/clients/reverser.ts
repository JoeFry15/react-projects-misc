export function palindromeChecker(s: string): boolean {
  let sArr = s.split("");
  while (sArr.length > 1) {
    if (sArr[0] === sArr[sArr.length - 1]) {
      sArr.pop();
      sArr.shift();
    } else {
      return false;
    }
  }
  return true;
}

export function stringReverser(s: string): string {
  return s.split("").reverse().join("");
}
