"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricNames = exports.processResources = void 0;
const processMetricsHelpers_1 = require("./helpers/processMetricsHelpers");
const NODEJS_ACTIVE_RESOURCES = 'nodejs_active_resources';
const NODEJS_ACTIVE_RESOURCES_TOTAL = 'nodejs_active_resources_total';
const processResources = (meter, { prefix, labels }) => {
    if (typeof process.getActiveResourcesInfo !== 'function')
        return;
    const aggregateByObjectName = (0, processMetricsHelpers_1.createAggregatorByObjectName)();
    meter
        .createObservableGauge(prefix + NODEJS_ACTIVE_RESOURCES, {
        description: 'Number of active resources that are currently keeping the event loop alive, grouped by async resource type.',
    })
        .addCallback((observable) => {
        aggregateByObjectName(observable, labels, process.getActiveResourcesInfo());
    });
    meter
        .createObservableGauge(prefix + NODEJS_ACTIVE_RESOURCES_TOTAL, {
        description: 'Total number of active resources.',
    })
        .addCallback((observable) => {
        observable.observe(process.getActiveResourcesInfo().length, labels);
    });
};
exports.processResources = processResources;
exports.metricNames = [
    NODEJS_ACTIVE_RESOURCES,
    NODEJS_ACTIVE_RESOURCES_TOTAL,
];
//# sourceMappingURL=processResources.js.map