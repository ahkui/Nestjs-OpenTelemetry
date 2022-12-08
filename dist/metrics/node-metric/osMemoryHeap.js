"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricNames = exports.osMemoryHeap = void 0;
const osMemoryHeapLinux_1 = require("./osMemoryHeapLinux");
const safeMemoryUsage_1 = require("./helpers/safeMemoryUsage");
const process_1 = require("process");
const PROCESS_RESIDENT_MEMORY = 'process_resident_memory_bytes';
const notLinuxVariant = (meter, { prefix, labels }) => {
    meter
        .createObservableGauge(prefix + PROCESS_RESIDENT_MEMORY, {
        description: 'Resident memory size in bytes.',
    })
        .addCallback((observable) => {
        const memUsage = (0, safeMemoryUsage_1.safeMemoryUsage)();
        if (memUsage)
            observable.observe(memUsage.rss, labels);
    });
};
exports.osMemoryHeap = process_1.platform === 'linux' ? osMemoryHeapLinux_1.linuxVariant : notLinuxVariant;
exports.metricNames = process_1.platform === 'linux' ? osMemoryHeapLinux_1.metricNames : [PROCESS_RESIDENT_MEMORY];
//# sourceMappingURL=osMemoryHeap.js.map