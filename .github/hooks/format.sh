#!/usr/bin/env bash

set -euo pipefail

payload="$(cat)"

if [[ -z "${payload}" ]]; then
  exit 0
fi

tool_name="$(
  printf '%s' "${payload}" | node -e '
    let input = "";
    process.stdin.on("data", (chunk) => {
      input += chunk;
    });
    process.stdin.on("end", () => {
      try {
        const parsed = JSON.parse(input);
        process.stdout.write(parsed.toolName ?? "");
      } catch {
        process.exit(0);
      }
    });
  '
)"

if [[ "${tool_name}" == "apply_patch" ]]; then
  npx prettier --write .
fi
