"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricNames = exports.version = void 0;
const process = require("process");
const NODE_VERSION_INFO = 'nodejs_version_info';
const version = (meter, { prefix, labels }) => {
    const versionSegments = process.version.slice(1).split('.').map(Number);
    const version = {
        ...labels,
        version: process.version,
        major: versionSegments[0],
        minor: versionSegments[1],
        patch: versionSegments[2],
    };
    meter
        .createUpDownCounter(prefix + NODE_VERSION_INFO, {
        description: 'Node.js version info.',
    })
        .add(1, version);
};
exports.version = version;
exports.metricNames = [NODE_VERSION_INFO];
//# sourceMappingURL=version.js.map