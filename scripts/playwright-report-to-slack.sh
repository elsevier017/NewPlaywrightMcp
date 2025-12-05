#!/bin/bash
# Run Playwright tests, capture a summary, and send a Slack notification using the configured webhook.

set -uo pipefail

# Move to repository root regardless of where the script is executed from
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$REPO_ROOT"

# Load environment variables from .env if available
if [ -f .env ]; then
	export $(grep -v '^#' .env | xargs)
fi

if [ -z "${SLACK_WEBHOOK:-}" ]; then
	echo "SLACK_WEBHOOK not set. Please add it to your .env file."
	exit 1
fi

echo "Running Playwright tests..."
TEST_OUTPUT_FILE="/tmp/playwright-output.log"
npx playwright test --reporter=list 2>&1 | tee "$TEST_OUTPUT_FILE"
TEST_EXIT=${PIPESTATUS[0]}

# Ensure HTML report is available (Playwright generates to playwright-report/ by default)
if [ -d playwright-report ]; then
	zip -qr /tmp/playwright-report.zip playwright-report >/dev/null 2>&1 || true
fi

SUMMARY=$(tail -n 40 "$TEST_OUTPUT_FILE")
STATUS="success"
if [ "$TEST_EXIT" -ne 0 ]; then
	STATUS="failure"
fi

MESSAGE="Playwright test run finished with status: $STATUS (exit code $TEST_EXIT).\nRecent output:\n$SUMMARY\n\nLocal report path: $(pwd)/playwright-report/index.html"

if command -v jq >/dev/null 2>&1; then
	PAYLOAD=$(jq -n --arg text "$MESSAGE" '{text: $text}')
else
	if command -v python3 >/dev/null 2>&1; then
		PAYLOAD=$(printf '%s' "$MESSAGE" | python3 -c 'import json,sys; print(json.dumps({"text": sys.stdin.read()}))')
	else
		ESCAPED_MESSAGE=$(printf '%s' "$MESSAGE" | sed 's/"/\\"/g' | tr '\n' '\\n')
		PAYLOAD="{\"text\":\"$ESCAPED_MESSAGE\"}"
	fi
fi

curl -X POST -H 'Content-type: application/json' --data "$PAYLOAD" "$SLACK_WEBHOOK"

echo "Slack notification sent. Detailed HTML report available locally at $(pwd)/playwright-report/index.html"

exit "$TEST_EXIT"
