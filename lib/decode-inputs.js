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

  // Write each decoded input to GITHUB_OUTPUT
  Object.entries(decodedInput).forEach(([key, value]) => {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
  });

  console.log("Successfully decoded inputs");
} catch (error) {
  console.error("Error decoding input:", error);
  process.exit(1);
}
