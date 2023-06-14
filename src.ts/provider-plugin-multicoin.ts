import { MulticoinProviderPlugin as _MulticoinProviderPlugin } from "ethers";
import { assert, assertArgument, getBytes } from "ethers";

import { formatsByCoinType } from '@ensdomains/address-encoder';

import type { BytesLike } from "ethers";


const PluginId = "org.ethers.plugins.provider.multicoin";

export class MulticoinProviderPlugin extends _MulticoinProviderPlugin {
    constructor() {
        super(PluginId);
    }

    supportsCoinType(coinType: number): boolean {
        return !!formatsByCoinType[coinType];
    }

    async encodeAddress(coinType: number, address: string): Promise<string> {
        const coder = formatsByCoinType[coinType];
        assert(coder, "unsupported coinType", "UNSUPPORTED_OPERATION", {
            operation: "encodeAddress", info: { coinType, address }
        });

        try {
            const result = coder.decoder(address);
            assertArgument(result, `invalid address for coinType=${ coinType}`, "address", address);
            return result;
        } catch (error: any) {
            assertArgument(false, `invalid address for coinType=${ coinType }; ${ error.message }`, "address", address);
        }
    }

    async decodeAddress(coinType: number, _data: BytesLike): Promise<string> {
        // @TODO: fix upstream dependency from depending on Node Buffer
        const data = Buffer.from(getBytes(_data, "data"));

        const coder = formatsByCoinType[coinType];
        assert(coder, "unsupported coinType", "UNSUPPORTED_OPERATION", {
            operation: "decodeAddress", info: { coinType, data }
        });

        try {
            const result = coder.encoder(data);
            assertArgument(result, `invalid data for coinType=${ coinType}`, "data", data);
            return result;
        } catch (error: any) {
            assertArgument(false, `invalid address for coinType=${ coinType }; ${ error.message }`, "data", data);
        }
    }
}

export const plugin = new MulticoinProviderPlugin();

