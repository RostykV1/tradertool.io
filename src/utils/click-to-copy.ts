export const clickToCopy = (value: number | string) => {
  navigator.clipboard.writeText(JSON.stringify(value));
  console.clear();
  console.log("Copied to clipboard:", value);
};
