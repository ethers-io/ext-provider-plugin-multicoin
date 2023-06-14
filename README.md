Ethers: ENS Multicoin Provider Plug-in
======================================

The **MulticoinProviderPlugin** extends a Provider's ENS Resolver
with access to the necessary coding libraries required to decode
all supported [ENSIP-9](https://docs.ens.domains/ens-improvement-proposals/ensip-9-multichain-address-resolution)
coinTypes returned by the `getAddr(bytes32, uint)` resolver method.


Installing
----------

```shell
/home/ricmoo/my_project> npm install @ethers-ext/provider-plugin-multicoin
```

Usage
-----

```javascript
import { plugin } from "@ethers-ext/provider-plugin-multicoin";

// However you get your provider
const provider = ethers.getDefaultProvider();

// Attach a plugin instance
provider.attchPlugin(plugin);

// Test it out!
(async function() {
    const resolver = await provider.getResolver("ricmoo.eth");

    // Get the Bitcoin address (coinType 0)
    console.log(await resolver.getAddress(0));
})();
```


License
-------

MIT License.
