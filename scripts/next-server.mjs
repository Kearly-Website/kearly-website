import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [mode = "dev", ...rawArgs] = process.argv.slice(2);
if (mode !== "dev" && mode !== "build" && mode !== "start") {
  console.error(
    `Unsupported mode "${mode}". Expected "dev", "build", or "start".`,
  );
  process.exit(1);
}

const projectRoot = path.resolve(
  fileURLToPath(new URL("..", import.meta.url)),
);
const nextBin = path.join(projectRoot, "node_modules/next/dist/bin/next");

let port = process.env.PORT || "3000";
// Cloud Run's HOSTNAME may identify the container; its ingress needs all interfaces.
let hostname = "0.0.0.0";
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

function runAndForward(cmdArgs, envOverrides = {}, cwd = projectRoot) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, cmdArgs, {
      cwd,
      stdio: "inherit",
      env: { ...process.env, ...envOverrides },
    });

    const onSignal = (signal) => {
      if (!child.killed) child.kill(signal);
    };
    process.on("SIGINT", onSignal);
    process.on("SIGTERM", onSignal);

    child.on("exit", (code, signal) => {
      process.off("SIGINT", onSignal);
      process.off("SIGTERM", onSignal);
      resolve({ code: code ?? 0, signal });
    });
  });
}

if (mode === "build") {
  const result = await runAndForward([nextBin, "build", ...passthrough], {
    NODE_ENV: "production",
  });
  if (result.signal) process.kill(process.pid, result.signal);
  if (result.code !== 0) process.exit(result.code);

  process.exit(0);
}

if (mode === "start") {
  const result = await runAndForward(
    [nextBin, "start", "--port", port, "--hostname", hostname, ...passthrough],
    { NODE_ENV: "production" },
  );
  if (result.signal) process.kill(process.pid, result.signal);
  process.exit(result.code);
}

const result = await runAndForward(
  [nextBin, "dev", "--port", port, "--hostname", hostname, ...passthrough],
  { NODE_ENV: "development" },
);
if (result.signal) process.kill(process.pid, result.signal);
process.exit(result.code);
