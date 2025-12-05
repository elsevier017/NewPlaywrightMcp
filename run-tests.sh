#!/bin/bash

# Test Runner Script
# Run Playwright tests with proper error handling

echo "🎭 Starting Playwright E2E Tests..."
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Run tests
npm test -- --project=chromium 2>&1 | tee test-run.log

# Check exit code
if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Check test-run.log for details.${NC}"
    exit 1
fi
