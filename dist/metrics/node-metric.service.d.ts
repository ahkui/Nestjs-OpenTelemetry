import { MetricAttributes } from '@opentelemetry/api';
export declare class NodeMetricService {
    start(config?: {
        prefix: string;
        labels?: MetricAttributes;
    }): void;
}
