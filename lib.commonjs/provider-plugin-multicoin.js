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
exports.plugin = exports.MulticoinProviderPlugin = void 0;
const ethers_1 = require("ethers");
const ethers_2 = require("ethers");
const address_encoder_1 = require("@ensdomains/address-encoder");
const PluginId = "org.ethers.plugins.provider.multicoin";
class MulticoinProviderPlugin extends ethers_1.MulticoinProviderPlugin {
    constructor() {
        super(PluginId);
    }
    supportsCoinType(coinType) {
        return !!address_encoder_1.formatsByCoinType[coinType];
    }
    encodeAddress(coinType, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const coder = address_encoder_1.formatsByCoinType[coinType];
            (0, ethers_2.assert)(coder, "unsupported coinType", "UNSUPPORTED_OPERATION", {
                operation: "encodeAddress", info: { coinType, address }
            });
            try {
                const result = coder.decoder(address);
                (0, ethers_2.assertArgument)(result, `invalid address for coinType=${coinType}`, "address", address);
                return result;
            }
            catch (error) {
                (0, ethers_2.assertArgument)(false, `invalid address for coinType=${coinType}; ${error.message}`, "address", address);
            }
        });
    }
    decodeAddress(coinType, _data) {
        return __awaiter(this, void 0, void 0, function* () {
            // @TODO: fix upstream dependency from depending on Node Buffer
            const data = Buffer.from((0, ethers_2.getBytes)(_data, "data"));
            const coder = address_encoder_1.formatsByCoinType[coinType];
            (0, ethers_2.assert)(coder, "unsupported coinType", "UNSUPPORTED_OPERATION", {
                operation: "decodeAddress", info: { coinType, data }
            });
            try {
                const result = coder.encoder(data);
                (0, ethers_2.assertArgument)(result, `invalid data for coinType=${coinType}`, "data", data);
                return result;
            }
            catch (error) {
                (0, ethers_2.assertArgument)(false, `invalid address for coinType=${coinType}; ${error.message}`, "data", data);
            }
        });
    }
}
exports.MulticoinProviderPlugin = MulticoinProviderPlugin;
exports.plugin = new MulticoinProviderPlugin();
//# sourceMappingURL=provider-plugin-multicoin.js.map