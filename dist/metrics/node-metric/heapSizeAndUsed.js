"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricNames = exports.heapSizeAndUsed = void 0;
const safeMemoryUsage_1 = require("./helpers/safeMemoryUsage");
const NODEJS_HEAP_SIZE_TOTAL = 'nodejs_heap_size_total_bytes';
const NODEJS_HEAP_SIZE_USED = 'nodejs_heap_size_used_bytes';
const NODEJS_EXTERNAL_MEMORY = 'nodejs_external_memory_bytes';
const heapSizeAndUsed = (meter, { labels, prefix }) => {
    let stats;
    function getStats() {
        if (stats !== undefined)
            return stats;
        stats = (0, safeMemoryUsage_1.safeMemoryUsage)() || null;
        setTimeout(() => {
            stats = undefined;
        }, 1000).unref();
        return stats;
    }
    meter
        .createObservableGauge(prefix + NODEJS_HEAP_SIZE_TOTAL, {
        description: 'Process heap size from Node.js in bytes.',
    })
        .addCallback((observable) => {
        if (!getStats())
            return;
        observable.observe(stats.heapTotal, labels);
    });
    meter
        .createObservableGauge(prefix + NODEJS_HEAP_SIZE_USED, {
        description: 'Process heap size used from Node.js in bytes.',
    })
        .addCallback((observable) => {
        if (!getStats())
            return;
        observable.observe(stats.heapUsed, labels);
    });
    meter
        .createObservableGauge(prefix + NODEJS_EXTERNAL_MEMORY, {
        description: 'Node.js external memory size in bytes.',
    })
        .addCallback((observable) => {
        if (!getStats())
            return;
        if (stats.external === undefined)
            return;
        observable.observe(stats.external, labels);
    });
};
exports.heapSizeAndUsed = heapSizeAndUsed;
exports.metricNames = [
    NODEJS_HEAP_SIZE_TOTAL,
    NODEJS_HEAP_SIZE_USED,
    NODEJS_EXTERNAL_MEMORY,
];
//# sourceMappingURL=heapSizeAndUsed.js.map