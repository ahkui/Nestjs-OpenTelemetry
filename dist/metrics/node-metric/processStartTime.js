"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processStartTime = void 0;
const process = require("process");
const startInSeconds = Math.round(Date.now() / 1000 - process.uptime());
const PROCESS_START_TIME = 'process_start_time_seconds';
const processStartTime = (meter, { prefix, labels }) => {
    meter
        .createUpDownCounter(prefix + PROCESS_START_TIME, {
        description: 'Start time of the process since unix epoch in seconds.',
    })
        .add(startInSeconds, labels);
};
exports.processStartTime = processStartTime;
module.exports.metricNames = [PROCESS_START_TIME];
//# sourceMappingURL=processStartTime.js.map