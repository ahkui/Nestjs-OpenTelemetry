/// <reference types="node" />
import { NestMiddleware } from '@nestjs/common';
import { MetricService } from '../metrics/metric.service';
import { NextFunction } from 'express';
import { ServerResponse, IncomingMessage } from 'http';
export declare class ApiMetricsMiddleware implements NestMiddleware {
    private readonly metricService;
    private defaultMetricAttributes;
    private httpServerRequestCount;
    private httpServerResponseCount;
    private httpServerDuration;
    private httpServerRequestSize;
    private httpServerResponseSize;
    private httpServerAbortCount;
    constructor(metricService: MetricService);
    use(req: IncomingMessage, res: ServerResponse, next: NextFunction): void;
}
