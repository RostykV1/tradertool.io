export const clickToCopy = (value: any) => {
  navigator.clipboard.writeText(JSON.stringify(value));
  console.clear();
  console.log("Copied to clipboard:", value);
};
