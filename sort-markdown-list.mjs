import readline from "readline/promises";

const alphanumericRegex = /[^a-z0-9]/gi;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const alphanumericComparison = (a, b) => {
  return a
    .replace(alphanumericRegex, "")
    .toLowerCase()
    .localeCompare(b.toLowerCase().replace(alphanumericRegex, ""));
};

const readLines = () => {
  return new Promise((resolve) => {
    const list = [];
    rl.on("line", (line) => {
      if (line.replace(alphanumericRegex, "").length) {
        list.push(line);
      }
    });
    rl.on("close", () => {
      resolve(list);
    });
  });
};

let lines = await readLines();
lines.sort(alphanumericComparison);

for (const line of lines) {
  console.log(line);
}
