const https = require('https');

class SlackReporter {
  constructor(options = {}) {
    this.webhook = process.env.SLACK_WEBHOOK || options.webhook;
    this.testResults = [];
    this.runStartTime = null;
  }

  async onBegin(config, suite) {
    this.runStartTime = Date.now();
    const total = suite.allTests().length;
    // Retain run start timestamp for duration calculation; no Slack message needed here for the requested format.
  }

  async onTestEnd(test, result) {
    this.testResults.push({ test, result });
    // onTestEnd only collects results; messaging happens in onEnd to support Slack/Teams summary format.
  }

  async onEnd(result) {
    const elapsedSeconds = this.runStartTime ? (Date.now() - this.runStartTime) / 1000 : 0;
    const totalTests = this.testResults.length;
    const counts = this.#countStatuses();
    const failedTotal = counts.failed + counts.timedOut + counts.interrupted;
    const passRate = totalTests > 0 ? ((counts.passed / totalTests) * 100) : 0;
    const formattedPassRate = this.#formatPercentage(passRate);
    const formattedDuration = elapsedSeconds > 0 ? this.#formatDuration(elapsedSeconds) : '0.00s';
    const reportLink = process.env.PLAYWRIGHT_REPORT_LINK || '<local-build|View Report>';

    const messageLines = [
      ':white_tick: Playwright Test Results',
      'Total Tests:',
      String(totalTests),
      ':white_tick: Passed:',
      String(counts.passed),
      ':x: Failed:',
      String(failedTotal),
      'Pass Rate:',
      `${formattedPassRate}%`,
      `:stopwatch: Duration: ${formattedDuration} | :link: ${reportLink}`,
    ];

    await this.#postMessage(messageLines.join('\n'));
  }

  async #postMessage(text) {
    if (!this.webhook || !text) {
      return;
    }

    try {
      await new Promise((resolve, reject) => {
        const payload = JSON.stringify({ text });
        const url = new URL(this.webhook);
        const options = {
          hostname: url.hostname,
          path: url.pathname + url.search,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
          },
        };

        const req = https.request(options, (res) => {
          res.on('data', () => {});
          res.on('end', resolve);
        });

        req.on('error', (error) => {
          console.warn('[SlackReporter] Failed to post to Slack:', error.message);
          resolve();
        });

        req.write(payload);
        req.end();
      });
    } catch (error) {
      console.warn('[SlackReporter] Unexpected error posting to Slack:', error);
    }
  }

  #countStatuses() {
    const counts = { passed: 0, failed: 0, skipped: 0, timedOut: 0, interrupted: 0 };

    for (const { result } of this.testResults) {
      if (counts[result.status] !== undefined) {
        counts[result.status] += 1;
      }
    }

    return counts;
  }

  #formatPercentage(value) {
    const rounded = value.toFixed(2);
    return rounded.endsWith('.00') ? rounded.slice(0, -3) : rounded;
  }

  #formatDuration(seconds) {
    const rounded = seconds.toFixed(2);
    return rounded.endsWith('.00') ? `${Math.round(seconds)}s` : `${rounded}s`;
  }
}

module.exports = SlackReporter;
