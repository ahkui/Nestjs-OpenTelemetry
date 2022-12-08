"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateObservableUpDownCounter = exports.getOrCreateObservableCounter = exports.getOrCreateObservableGauge = exports.getOrCreateUpDownCounter = exports.getOrCreateCounter = exports.getOrCreateHistogram = exports.meterData = exports.MetricType = void 0;
const api_1 = require("@opentelemetry/api");
const Constants_1 = require("../Constants");
var MetricType;
(function (MetricType) {
    MetricType["Counter"] = "Counter";
    MetricType["UpDownCounter"] = "UpDownCounter";
    MetricType["Histogram"] = "Histogram";
    MetricType["ObservableGauge"] = "ObservableGauge";
    MetricType["ObservableCounter"] = "ObservableCounter";
    MetricType["ObservableUpDownCounter"] = "ObservableUpDownCounter";
})(MetricType = exports.MetricType || (exports.MetricType = {}));
exports.meterData = new Map();
function getOrCreateHistogram(name, options = {}) {
    if (exports.meterData.has(name)) {
        return exports.meterData.get(name);
    }
    const meter = api_1.metrics.getMeterProvider().getMeter(Constants_1.Constants.OTEL_METRIC_NAME);
    const histogram = meter.createHistogram(name, options);
    exports.meterData.set(name, histogram);
    return histogram;
}
exports.getOrCreateHistogram = getOrCreateHistogram;
function getOrCreateCounter(name, options = {}) {
    if (exports.meterData.has(name)) {
        return exports.meterData.get(name);
    }
    const meter = api_1.metrics.getMeterProvider().getMeter(Constants_1.Constants.OTEL_METRIC_NAME);
    const counter = meter.createCounter(name, options);
    exports.meterData.set(name, counter);
    return counter;
}
exports.getOrCreateCounter = getOrCreateCounter;
function getOrCreateUpDownCounter(name, options = {}) {
    if (exports.meterData.has(name)) {
        return exports.meterData.get(name);
    }
    const meter = api_1.metrics.getMeterProvider().getMeter(Constants_1.Constants.OTEL_METRIC_NAME);
    const upDownCounter = meter.createUpDownCounter(name, options);
    exports.meterData.set(name, upDownCounter);
    return upDownCounter;
}
exports.getOrCreateUpDownCounter = getOrCreateUpDownCounter;
function getOrCreateObservableGauge(name, options = {}) {
    if (exports.meterData.has(name)) {
        return exports.meterData.get(name);
    }
    const meter = api_1.metrics.getMeterProvider().getMeter(Constants_1.Constants.OTEL_METRIC_NAME);
    const observableGauge = meter.createObservableGauge(name, options);
    exports.meterData.set(name, observableGauge);
    return observableGauge;
}
exports.getOrCreateObservableGauge = getOrCreateObservableGauge;
function getOrCreateObservableCounter(name, options = {}) {
    if (exports.meterData.has(name)) {
        return exports.meterData.get(name);
    }
    const meter = api_1.metrics.getMeterProvider().getMeter(Constants_1.Constants.OTEL_METRIC_NAME);
    const observableCounter = meter.createObservableCounter(name, options);
    exports.meterData.set(name, observableCounter);
    return observableCounter;
}
exports.getOrCreateObservableCounter = getOrCreateObservableCounter;
function getOrCreateObservableUpDownCounter(name, options = {}) {
    if (exports.meterData.has(name)) {
        return exports.meterData.get(name);
    }
    const meter = api_1.metrics.getMeterProvider().getMeter(Constants_1.Constants.OTEL_METRIC_NAME);
    const observableCounter = meter.createObservableCounter(name, options);
    exports.meterData.set(name, observableCounter);
    return observableCounter;
}
exports.getOrCreateObservableUpDownCounter = getOrCreateObservableUpDownCounter;
//# sourceMappingURL=metric-data.js.map