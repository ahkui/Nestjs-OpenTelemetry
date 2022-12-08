import { Meter, MetricAttributes } from '@opentelemetry/api';
export declare const processResources: (Meter: Meter, config: {
    prefix?: string;
    labels?: MetricAttributes;
}) => void;
export declare const metricNames: string[];
