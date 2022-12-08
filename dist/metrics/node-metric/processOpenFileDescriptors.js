"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricNames = exports.processOpenFileDescriptors = void 0;
const fs = require("fs");
const process = require("process");
const PROCESS_OPEN_FDS = 'process_open_fds';
const processOpenFileDescriptors = (meter, { prefix, labels }) => {
    if (process.platform !== 'linux')
        return;
    meter
        .createObservableGauge(prefix + PROCESS_OPEN_FDS, {
        description: 'Number of open file descriptors.',
    })
        .addCallback((observable) => {
        try {
            const fds = fs.readdirSync('/proc/self/fd');
            observable.observe(fds.length - 1, labels);
        }
        catch {
        }
    });
};
exports.processOpenFileDescriptors = processOpenFileDescriptors;
exports.metricNames = [PROCESS_OPEN_FDS];
//# sourceMappingURL=processOpenFileDescriptors.js.map