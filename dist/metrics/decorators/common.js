"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtelMethodCounter = exports.OtelInstanceCounter = void 0;
const utils_1 = require("../utils");
const metric_data_1 = require("../metric-data");
const OtelInstanceCounter = (options) => (originalClass) => {
    const name = `app_${originalClass.name}_instances_total`;
    const description = `app_${originalClass.name} object instances total`;
    let counterMetric;
    const wrappedClass = class extends originalClass {
        constructor(...args) {
            if (!counterMetric) {
                counterMetric = (0, metric_data_1.getOrCreateCounter)(name, { description, ...options });
            }
            counterMetric.add(1);
            super(...args);
        }
    };
    (0, utils_1.copyMetadataFromFunctionToFunction)(originalClass, wrappedClass);
    return wrappedClass;
};
exports.OtelInstanceCounter = OtelInstanceCounter;
const OtelMethodCounter = (options) => (target, propertyKey, descriptor) => {
    const className = target.constructor.name;
    const name = `app_${className}_${propertyKey.toString()}_calls_total`;
    const description = `app_${className}#${propertyKey.toString()} called total`;
    let counterMetric;
    const originalFunction = descriptor.value ?? (() => { });
    const wrappedFunction = function PropertyDescriptor(...args) {
        if (!counterMetric) {
            counterMetric = (0, metric_data_1.getOrCreateCounter)(name, { description, ...options });
        }
        counterMetric.add(1);
        return originalFunction.apply(this, args);
    };
    descriptor.value = wrappedFunction;
    (0, utils_1.copyMetadataFromFunctionToFunction)(originalFunction, wrappedFunction);
};
exports.OtelMethodCounter = OtelMethodCounter;
//# sourceMappingURL=common.js.map