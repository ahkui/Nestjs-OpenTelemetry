"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyMetadataFromFunctionToFunction = exports.getToken = void 0;
function getToken(name) {
    return `OTEL_METRIC_${name.toUpperCase()}`;
}
exports.getToken = getToken;
const copyMetadataFromFunctionToFunction = (originalFunction, newFunction) => {
    Reflect.getMetadataKeys(originalFunction).forEach((metadataKey) => {
        Reflect.defineMetadata(metadataKey, Reflect.getMetadata(metadataKey, originalFunction), newFunction);
    });
};
exports.copyMetadataFromFunctionToFunction = copyMetadataFromFunctionToFunction;
//# sourceMappingURL=utils.js.map