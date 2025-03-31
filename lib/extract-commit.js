const fs = require("fs");
const path = require("path");

// Path to the aider output file
const outputFilePath = "/tmp/aider/output.txt";

try {
  // Read the aider output file
  const aiderOutput = fs.readFileSync(outputFilePath, "utf8");

  // Regular expression to find commit messages
  const commitRegex = /Commit [a-f0-9]+ (.*)/;

  // Find all commit lines
  const commitLines = aiderOutput
    .split("\n")
    .filter((line) => commitRegex.test(line));

  if (commitLines.length > 0) {
    // Get the last commit line
    const lastCommitLine = commitLines[commitLines.length - 1];

    // Extract the commit message
    const match = lastCommitLine.match(commitRegex);
    let commitMessage = match[1];

    // Remove any quotes that might cause issues
    commitMessage = commitMessage.replace(/"/g, "");

    // Output the commit message and changes_made flag
    console.log(`Found commit message: ${commitMessage}`);
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `commit_message=${commitMessage}\n`
    );
    fs.appendFileSync(process.env.GITHUB_OUTPUT, "changes_made=true\n");
  } else {
    // No commit was found
    console.log("No changes were made by Aider");
    fs.appendFileSync(process.env.GITHUB_OUTPUT, "changes_made=false\n");
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      "commit_message=No changes required\n"
    );
  }
} catch (error) {
  console.error("Error processing aider output:", error);
  process.exit(1);
}
