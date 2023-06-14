Ethers: ENS Multicoin Provider Plug-in
======================================

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
