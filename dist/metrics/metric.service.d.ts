import { MetricOptions } from '@opentelemetry/api';
export declare class MetricService {
    getCounter(name: string, options?: MetricOptions): import("@opentelemetry/api").Counter<import("@opentelemetry/api").Attributes>;
    getUpDownCounter(name: string, options?: MetricOptions): import("@opentelemetry/api").UpDownCounter<import("@opentelemetry/api").Attributes>;
    getHistogram(name: string, options?: MetricOptions): import("@opentelemetry/api").Histogram<import("@opentelemetry/api").Attributes>;
    getObservableCounter(name: string, options?: MetricOptions): import("@opentelemetry/api").ObservableCounter<import("@opentelemetry/api").Attributes>;
    getObservableGauge(name: string, options?: MetricOptions): import("@opentelemetry/api").ObservableGauge<import("@opentelemetry/api").Attributes>;
    getObservableUpDownCounter(name: string, options?: MetricOptions): import("@opentelemetry/api").ObservableUpDownCounter<import("@opentelemetry/api").Attributes>;
}
