const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "hook.log");
const timestamp = new Date().toISOString();

let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  let context = {};
  try {
    context = JSON.parse(input);
  } catch {}

  const entry = `[${timestamp}] event=${context.hook_event || "unknown"} tool=${context.tool_name || "-"} session=${context.session_id || "-"}\n`;

  fs.appendFileSync(logFile, entry);
});
