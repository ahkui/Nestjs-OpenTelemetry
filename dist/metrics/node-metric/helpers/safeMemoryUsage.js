"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeMemoryUsage = void 0;
function safeMemoryUsage() {
    try {
        return process.memoryUsage();
    }
    catch { }
}
exports.safeMemoryUsage = safeMemoryUsage;
//# sourceMappingURL=safeMemoryUsage.js.map