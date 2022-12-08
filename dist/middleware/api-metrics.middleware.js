"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMetricsMiddleware = void 0;
const common_1 = require("@nestjs/common");
const responseTime = require("response-time");
const urlParser = require("url");
const metric_service_1 = require("../metrics/metric.service");
let ApiMetricsMiddleware = class ApiMetricsMiddleware {
    metricService;
    defaultMetricAttributes;
    httpServerRequestCount;
    httpServerResponseCount;
    httpServerDuration;
    httpServerRequestSize;
    httpServerResponseSize;
    httpServerAbortCount;
    constructor(metricService) {
        this.metricService = metricService;
        this.httpServerRequestCount = this.metricService.getCounter('http.server.request.count', {
            description: 'Total number of HTTP requests',
            unit: 'requests',
        });
        this.httpServerResponseCount = this.metricService.getCounter('http.server.response.count', {
            description: 'Total number of HTTP responses',
            unit: 'responses',
        });
        this.httpServerAbortCount = this.metricService.getCounter('http.server.abort.count', {
            description: 'Total number of data transfers aborted',
            unit: 'requests',
        });
        this.httpServerDuration = this.metricService.getHistogram('http.server.duration', {
            description: 'The duration of the inbound HTTP request',
            unit: 'ms',
        });
        this.httpServerRequestSize = this.metricService.getHistogram('http.server.request.size', {
            description: 'Size of incoming bytes',
            unit: 'By',
        });
        this.httpServerResponseSize = this.metricService.getHistogram('http.server.response.size', {
            description: 'Size of outgoing bytes',
            unit: 'By',
        });
    }
    use(req, res, next) {
        responseTime((req, res, time) => {
            const { url, method } = req;
            const path = urlParser.parse(url).pathname;
            this.httpServerRequestCount.add(1, { method, path });
            const requestLength = parseInt(req.headers['content-length'], 10) || 0;
            const responseLength = parseInt(res.getHeader('Content-Length').toString(), 10) || 0;
            const status = res.statusCode || 500;
            const attributes = {
                method,
                status,
                path,
                ...this.defaultMetricAttributes,
            };
            this.httpServerRequestSize.record(requestLength, attributes);
            this.httpServerResponseSize.record(responseLength, attributes);
            this.httpServerResponseCount.add(1, attributes);
            this.httpServerDuration.record(time / 1000, attributes);
            req.on('end', () => {
                if (req.destroyed === true) {
                    this.httpServerAbortCount.add(1);
                }
            });
        })(req, res, next);
    }
};
ApiMetricsMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(metric_service_1.MetricService)),
    __metadata("design:paramtypes", [metric_service_1.MetricService])
], ApiMetricsMiddleware);
exports.ApiMetricsMiddleware = ApiMetricsMiddleware;
//# sourceMappingURL=api-metrics.middleware.js.map