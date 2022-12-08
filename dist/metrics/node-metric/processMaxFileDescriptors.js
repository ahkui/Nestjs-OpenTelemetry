"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricNames = exports.processMaxFileDescriptors = void 0;
const fs_1 = require("fs");
const PROCESS_MAX_FDS = 'process_max_fds';
let maxFds;
const processMaxFileDescriptors = (meter, { prefix, labels }) => {
    if (maxFds === undefined) {
        try {
            const limits = (0, fs_1.readFileSync)('/proc/self/limits', 'utf8');
            const lines = limits.split('\n');
            for (const line of lines) {
                if (line.startsWith('Max open files')) {
                    const parts = line.split(/  +/);
                    maxFds = Number(parts[1]);
                    break;
                }
            }
        }
        catch {
            return;
        }
    }
    if (maxFds === undefined)
        return;
    meter
        .createUpDownCounter(prefix + PROCESS_MAX_FDS, {
        description: 'Maximum number of open file descriptors.',
    })
        .add(maxFds, labels);
};
exports.processMaxFileDescriptors = processMaxFileDescriptors;
exports.metricNames = [PROCESS_MAX_FDS];
//# sourceMappingURL=processMaxFileDescriptors.js.map