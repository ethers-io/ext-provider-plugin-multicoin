var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MulticoinProviderPlugin as _MulticoinProviderPlugin } from "ethers";
import { assert, assertArgument, getBytes } from "ethers";
import { formatsByCoinType } from '@ensdomains/address-encoder';
const PluginId = "org.ethers.plugins.provider.multicoin";
export class MulticoinProviderPlugin extends _MulticoinProviderPlugin {
    constructor() {
        super(PluginId);
    }
    supportsCoinType(coinType) {
        return !!formatsByCoinType[coinType];
    }
    encodeAddress(coinType, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const coder = formatsByCoinType[coinType];
            assert(coder, "unsupported coinType", "UNSUPPORTED_OPERATION", {
                operation: "encodeAddress", info: { coinType, address }
            });
            try {
                const result = coder.decoder(address);
                assertArgument(result, `invalid address for coinType=${coinType}`, "address", address);
                return result;
            }
            catch (error) {
                assertArgument(false, `invalid address for coinType=${coinType}; ${error.message}`, "address", address);
            }
        });
    }
    decodeAddress(coinType, _data) {
        return __awaiter(this, void 0, void 0, function* () {
            // @TODO: fix upstream dependency from depending on Node Buffer
            const data = Buffer.from(getBytes(_data, "data"));
            const coder = formatsByCoinType[coinType];
            assert(coder, "unsupported coinType", "UNSUPPORTED_OPERATION", {
                operation: "decodeAddress", info: { coinType, data }
            });
            try {
                const result = coder.encoder(data);
                assertArgument(result, `invalid data for coinType=${coinType}`, "data", data);
                return result;
            }
            catch (error) {
                assertArgument(false, `invalid address for coinType=${coinType}; ${error.message}`, "data", data);
            }
        });
    }
}
export const plugin = new MulticoinProviderPlugin();
//# sourceMappingURL=provider-plugin-multicoin.js.map