"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const index_js_1 = require("./index.js");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new ethers_1.ethers.InfuraProvider();
        provider.attachPlugin(index_js_1.plugin);
        const resolver = yield provider.getResolver("ricmoo.eth");
        ethers_1.ethers.assert(resolver, "missing resolver", "UNKNOWN_ERROR");
        console.log(resolver);
        console.log("BTC:", yield resolver.getAddress(0));
        console.log("ETH:", yield resolver.getAddress());
        console.log("ETH:", yield resolver.getAddress(60));
        console.log("MATIC:", yield resolver.getAddress(137));
    });
})();
//# sourceMappingURL=test.js.map