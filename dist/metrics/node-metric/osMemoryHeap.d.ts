import { Meter } from '@opentelemetry/api';
export declare const osMemoryHeap: (Meter: Meter, config: {
    prefix?: string;
    labels?: import("@opentelemetry/api").Attributes;
}) => void;
export declare const metricNames: string[];
