# @ixo/did-provider-x

A [Veramo](https://veramo.io/) / [`did-resolver`](https://github.com/decentralized-identity/did-resolver) plugin that resolves **`did:ixo`** (and the legacy **`did:x`**) DID methods against the ixo DID resolver service.

It returns resolver functions you can plug into a `did-resolver` `Resolver` or a Veramo `DIDResolverPlugin`, so DID documents (and their JSON-LD `@context`, required for verifiable-credential verification) resolve correctly.

## Install

```bash
npm install @ixo/did-provider-x
# or
yarn add @ixo/did-provider-x
```

## Usage

### With `did-resolver`

`getResolver(options?)` returns a method → resolver map for `ixo` and `x`:

```typescript
import { Resolver } from "did-resolver";
import { getResolver } from "@ixo/did-provider-x";

const resolver = new Resolver({
  ...getResolver(), // resolves did:ixo and did:x
});

const result = await resolver.resolve(
  "did:ixo:entity:54bede0aced5282b2401c58a048a731a"
);
console.log(result.didDocument);
```

Point it at a specific network's resolver with the `url` option:

```typescript
const resolver = new Resolver({
  ...getResolver({ url: "https://resolver.devnet.ixo.earth/1.0/identifiers/" }),
});
```

### With a Veramo agent

```typescript
import { createAgent, IResolver } from "@veramo/core";
import { DIDResolverPlugin } from "@veramo/did-resolver";
import { Resolver } from "did-resolver";
import { getResolver } from "@ixo/did-provider-x";

const agent = createAgent<IResolver>({
  plugins: [
    new DIDResolverPlugin({
      resolver: new Resolver({ ...getResolver() }),
    }),
  ],
});

await agent.resolveDid({
  didUrl: "did:ixo:entity:54bede0aced5282b2401c58a048a731a",
});
```

### Universal-resolver helpers

For resolving other DID methods through a [Universal Resolver](https://github.com/decentralized-identity/universal-resolver) instance:

```typescript
import {
  getUniversalResolver,
  getUniversalResolverFor,
} from "@ixo/did-provider-x";

// a single resolver for any method the universal resolver supports
const uni = getUniversalResolver();

// or map specific methods
const resolver = new Resolver({
  ...getUniversalResolverFor(["web", "key", "elem"]),
});
```

## API

| Export | Description |
| --- | --- |
| `getResolver(options?)` | Returns `{ ixo, x }` `DIDResolver`s for the ixo DID methods. |
| `IxoDidResolver` | Class form of the above (`new IxoDidResolver(options).build()`). |
| `getUniversalResolver(url?)` | A single `DIDResolver` backed by a universal resolver instance. |
| `getUniversalResolverFor(methods, url?)` | Maps the given DID methods to a universal resolver. |

`options.url` (and the `url` argument) is the base URL of a DID resolver endpoint, ending in `/1.0/identifiers/`. It defaults to `https://resolver.ixo.world/1.0/identifiers/`.

The resolvers request the JSON-LD DID representation (`Accept: application/did+ld+json`), so resolved documents include their `@context` — required for JSON-LD verifiable-credential verification.

## ixo network endpoints

| Network | RPC | DID resolver |
| --- | --- | --- |
| mainnet | `https://impacthub.ixo.world/rpc/` | `https://resolver.ixo.world/1.0/identifiers/` |
| testnet | `https://testnet.ixo.earth/rpc/` | `https://resolver.testnet.ixo.earth/1.0/identifiers/` |
| devnet | `https://devnet.ixo.earth/rpc/` | `https://resolver.devnet.ixo.earth/1.0/identifiers/` |

## Development

```bash
yarn install
yarn build      # build the main (CommonJS) and module (ESM) outputs
yarn build:ts   # emit type declarations
```

## License

Apache-2.0
