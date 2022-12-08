"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMetricService = void 0;
const common_1 = require("@nestjs/common");
const api_1 = require("@opentelemetry/api");
const Constants_1 = require("../Constants");
const eventLoopLag_1 = require("./node-metric/eventLoopLag");
const gc_1 = require("./node-metric/gc");
const heapSizeAndUsed_1 = require("./node-metric/heapSizeAndUsed");
const heapSpacesSizeAndUsed_1 = require("./node-metric/heapSpacesSizeAndUsed");
const osMemoryHeap_1 = require("./node-metric/osMemoryHeap");
const processCpuTotal_1 = require("./node-metric/processCpuTotal");
const processMaxFileDescriptors_1 = require("./node-metric/processMaxFileDescriptors");
const processOpenFileDescriptors_1 = require("./node-metric/processOpenFileDescriptors");
const processResources_1 = require("./node-metric/processResources");
const processStartTime_1 = require("./node-metric/processStartTime");
const version_1 = require("./node-metric/version");
let NodeMetricService = class NodeMetricService {
    start(config = { prefix: '' }) {
        const meter = api_1.metrics
            .getMeterProvider()
            .getMeter(Constants_1.Constants.OTEL_METRIC_NAME);
        (0, eventLoopLag_1.eventLoopLag)(meter, config);
        (0, gc_1.gc)(meter, config);
        (0, heapSizeAndUsed_1.heapSizeAndUsed)(meter, config);
        (0, heapSpacesSizeAndUsed_1.heapSpacesSizeAndUsed)(meter, config);
        (0, osMemoryHeap_1.osMemoryHeap)(meter, config);
        (0, processResources_1.processResources)(meter, config);
        (0, processCpuTotal_1.processCpuTotal)(meter, config);
        (0, processMaxFileDescriptors_1.processMaxFileDescriptors)(meter, config);
        (0, processOpenFileDescriptors_1.processOpenFileDescriptors)(meter, config);
        (0, version_1.version)(meter, config);
        (0, processStartTime_1.processStartTime)(meter, config);
    }
};
NodeMetricService = __decorate([
    (0, common_1.Injectable)()
], NodeMetricService);
exports.NodeMetricService = NodeMetricService;
//# sourceMappingURL=node-metric.service.js.map