#!/bin/bash
# Run Playwright tests and send results to Slack via webhook using curl

RESULT=$(npx playwright test)

WEBHOOK_URL="https://hooks.slack.com/services/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"

PAYLOAD=$(jq -n --arg text "Playwright test results:\n$RESULT" '{text: $text}')

curl -X POST -H 'Content-type: application/json' --data "$PAYLOAD" "$WEBHOOK_URL"
