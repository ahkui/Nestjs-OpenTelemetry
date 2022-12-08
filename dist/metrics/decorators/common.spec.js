"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const common_2 = require("./common");
const TestDecoratorThatSetsMetadata = () => (0, common_1.SetMetadata)('some-metadata', true);
let TestClass = class TestClass {
    method() { }
};
__decorate([
    TestDecoratorThatSetsMetadata(),
    (0, common_2.OtelMethodCounter)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestClass.prototype, "method", null);
TestClass = __decorate([
    (0, common_2.OtelInstanceCounter)(),
    TestDecoratorThatSetsMetadata()
], TestClass);
describe('OtelInstanceCounter', () => {
    let instance;
    beforeEach(() => {
        instance = new TestClass();
    });
    it('should maintain reflect metadata', async () => {
        expect(Reflect.getMetadata('some-metadata', instance.constructor)).toEqual(true);
    });
});
describe('OtelMethodCounter', () => {
    let instance;
    beforeEach(() => {
        instance = new TestClass();
    });
    it('should maintain reflect metadata', async () => {
        expect(Reflect.getMetadata('some-metadata', instance.method)).toEqual(true);
    });
});
//# sourceMappingURL=common.spec.js.map