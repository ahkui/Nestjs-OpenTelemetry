"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricNames = exports.linuxVariant = void 0;
const fs_1 = require("fs");
const values = ['VmSize', 'VmRSS', 'VmData'];
const PROCESS_RESIDENT_MEMORY = 'process_resident_memory_bytes';
const PROCESS_VIRTUAL_MEMORY = 'process_virtual_memory_bytes';
const PROCESS_HEAP = 'process_heap_bytes';
function structureOutput(input) {
    const returnValue = {};
    input
        .split('\n')
        .filter((s) => values.some((value) => s.indexOf(value) === 0))
        .forEach((string) => {
        const split = string.split(':');
        let value = split[1].trim();
        value = value.slice(0, value.length - 3);
        returnValue[split[0]] = Number(value) * 1024;
    });
    return returnValue;
}
const linuxVariant = (meter, { prefix, labels }) => {
    let stats;
    function getStats() {
        if (stats !== undefined)
            return stats;
        try {
            const stat = (0, fs_1.readFileSync)('/proc/self/status', 'utf8');
            stats = structureOutput(stat);
        }
        catch {
            stats = null;
        }
        setTimeout(() => {
            stats = undefined;
        }, 1000).unref();
        return stats;
    }
    meter
        .createObservableGauge(prefix + PROCESS_RESIDENT_MEMORY, {
        description: 'Resident memory size in bytes.',
    })
        .addCallback((observable) => {
        if (!getStats())
            return;
        observable.observe(stats.VmRSS, labels);
    });
    meter
        .createObservableGauge(prefix + PROCESS_VIRTUAL_MEMORY, {
        description: 'Virtual memory size in bytes.',
    })
        .addCallback((observable) => {
        if (!getStats())
            return;
        observable.observe(stats.VmSize, labels);
    });
    meter
        .createObservableGauge(prefix + PROCESS_HEAP, {
        description: 'Process heap size in bytes.',
    })
        .addCallback((observable) => {
        if (!getStats())
            return;
        observable.observe(stats.VmData, labels);
    });
};
exports.linuxVariant = linuxVariant;
exports.metricNames = [
    PROCESS_RESIDENT_MEMORY,
    PROCESS_VIRTUAL_MEMORY,
    PROCESS_HEAP,
];
//# sourceMappingURL=osMemoryHeapLinux.js.map