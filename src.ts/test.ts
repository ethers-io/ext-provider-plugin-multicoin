import { ethers } from "ethers";

import { plugin } from "./index.js";

(async function() {
    const provider = new ethers.InfuraProvider();
    provider.attachPlugin(plugin);

    const resolver = await provider.getResolver("ricmoo.eth");
    ethers.assert(resolver, "missing resolver", "UNKNOWN_ERROR");
    console.log(resolver);

    console.log("BTC:", await resolver.getAddress(0));
    console.log("ETH:", await resolver.getAddress());
    console.log("ETH:", await resolver.getAddress(60));
    console.log("MATIC:", await resolver.getAddress(137));
})();
