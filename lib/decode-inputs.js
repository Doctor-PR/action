const fs = require("fs");

// Read the encoded input from the environment variable
const encodedInput = process.env.ACTION_INPUT;

if (!encodedInput) {
  console.error("No encoded input provided");
  process.exit(1);
}

try {
  // Decode the input
  const decodedInput = JSON.parse(encodedInput);

  // Write the decoded input to a file that can be sourced by bash
  const output = Object.entries(decodedInput)
    .map(([key, value]) => `export ${key}="${value}"`)
    .join("\n");

  fs.writeFileSync(process.env.GITHUB_ENV, output + "\n", { flag: "a" });
  console.log("Successfully decoded inputs");
} catch (error) {
  console.error("Error decoding input:", error);
  process.exit(1);
}
