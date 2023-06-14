import { MulticoinProviderPlugin as _MulticoinProviderPlugin } from "ethers";
import type { BytesLike } from "ethers";
export declare class MulticoinProviderPlugin extends _MulticoinProviderPlugin {
    constructor();
    supportsCoinType(coinType: number): boolean;
    encodeAddress(coinType: number, address: string): Promise<string>;
    decodeAddress(coinType: number, _data: BytesLike): Promise<string>;
}
export declare const plugin: MulticoinProviderPlugin;
//# sourceMappingURL=provider-plugin-multicoin.d.ts.map