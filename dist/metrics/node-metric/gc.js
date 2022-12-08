"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricNames = exports.gc = void 0;
const perf_hooks_1 = require("perf_hooks");
const NODEJS_GC_DURATION_SECONDS = 'nodejs_gc_duration_seconds';
const gc = (meter, { prefix, labels }) => {
    const histogram = meter.createHistogram(prefix + NODEJS_GC_DURATION_SECONDS, {
        description: 'Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
    });
    const kinds = {};
    kinds[perf_hooks_1.constants.NODE_PERFORMANCE_GC_MAJOR] = { ...labels, kind: 'major' };
    kinds[perf_hooks_1.constants.NODE_PERFORMANCE_GC_MINOR] = { ...labels, kind: 'minor' };
    kinds[perf_hooks_1.constants.NODE_PERFORMANCE_GC_INCREMENTAL] = {
        ...labels,
        kind: 'incremental',
    };
    kinds[perf_hooks_1.constants.NODE_PERFORMANCE_GC_WEAKCB] = { ...labels, kind: 'weakcb' };
    const obs = new perf_hooks_1.PerformanceObserver((list) => {
        const entry = list.getEntries()[0];
        const detail = entry.detail;
        histogram.record(entry.duration / 1000, kinds[detail.kind]);
    });
    obs.observe({ entryTypes: ['gc'], buffered: false });
};
exports.gc = gc;
exports.metricNames = [NODEJS_GC_DURATION_SECONDS];
//# sourceMappingURL=gc.js.map