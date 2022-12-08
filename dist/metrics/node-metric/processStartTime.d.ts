import { Meter, MetricAttributes } from '@opentelemetry/api';
export declare const processStartTime: (Meter: Meter, config: {
    prefix?: string;
    labels?: MetricAttributes;
}) => void;
