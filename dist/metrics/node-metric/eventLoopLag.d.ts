import { Meter, MetricAttributes } from '@opentelemetry/api';
export declare const eventLoopLag: (Meter: Meter, config: {
    prefix?: string;
    labels?: MetricAttributes;
    eventLoopMonitoringPrecision?: number;
}) => void;
export declare const metricNames: string[];
