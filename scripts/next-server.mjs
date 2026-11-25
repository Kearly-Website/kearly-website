import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const [mode = "dev", ...rawArgs] = process.argv.slice(2);
if (mode !== "dev" && mode !== "start") {
  console.error(`Unsupported mode "${mode}". Expected "dev" or "start".`);
  process.exit(1);
}

let port = process.env.PORT || "3000";
let hostname = process.env.HOSTNAME || "0.0.0.0";
const passthrough = [];

for (let i = 0; i < rawArgs.length; i += 1) {
  const arg = rawArgs[i];
  if (arg === "--port" || arg === "-p") {
    if (rawArgs[i + 1]) {
      port = rawArgs[i + 1];
      i += 1;
    }
    continue;
  }
  if (arg.startsWith("--port=")) {
    port = arg.slice("--port=".length);
    continue;
  }
  if (arg === "--host" || arg === "--hostname" || arg === "-H") {
    if (rawArgs[i + 1]) {
      hostname = rawArgs[i + 1];
      i += 1;
    }
    continue;
  }
  if (arg.startsWith("--host=")) {
    hostname = arg.slice("--host=".length);
    continue;
  }
  if (arg.startsWith("--hostname=")) {
    hostname = arg.slice("--hostname=".length);
    continue;
  }
  passthrough.push(arg);
}

const nextBin = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);

const child = spawn(
  process.execPath,
  [nextBin, mode, "--port", port, "--hostname", hostname, ...passthrough],
  { stdio: "inherit" },
);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    if (!child.killed) child.kill(signal);
  });
}

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
