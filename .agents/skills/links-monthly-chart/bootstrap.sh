#!/usr/bin/env bash
# Bootstrap the links-monthly-chart skill environment.
# Run once from the project root:
#   bash .agents/skills/links-monthly-chart/bootstrap.sh

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Creating virtual environment at ${SKILL_DIR}/.venv …"
python3 -m venv "${SKILL_DIR}/.venv"

echo "Installing dependencies from requirements.txt …"
"${SKILL_DIR}/.venv/bin/pip" install --quiet -r "${SKILL_DIR}/requirements.txt"

echo "Done. Activate with:"
echo "  source ${SKILL_DIR}/.venv/bin/activate"