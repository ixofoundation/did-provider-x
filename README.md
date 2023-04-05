# Veramo SDK plugin for x/ixo DID method

## ℹ️ Overview

The purpose of this [`@ixo/did-provider-x` NPM package](https://www.npmjs.com/package/@ixo/did-provider-x) is to enable developers to interact with the ixo ledger using [Veramo SDK](https://veramo.io/), a modular and pluggable client app SDK for decentralised identity and SSI applications.

This package includes [Veramo SDK Agent methods](https://veramo.io/docs/veramo_agent/plugins) for use with the [Veramo CLI NPM package](https://www.npmjs.com/package/@veramo/cli). It can also be consumed as an NPM package outside Veramo CLI for building your own applications with NPM.

The package's core functionality is borrowed from [Veramo Core NPM package](https://www.npmjs.com/package/@veramo/core) and extends this to include ixo ledger functionality, such as creating and managing DIDs.

## 🧑‍💻🛠 Quick Start

These quick start steps provide the _minimal_ configuration that you need to set Veramo CLI for use with ixo.

### 1. Install Veramo CLI and clone this repo

This step is exactly [as described in Veramo CLI docs](https://veramo.io/docs/veramo_agent/cli_tool/):

```bash
npm install -g @veramo/cli@latest
git clone https://github.com/ixofoundation/did-provider-x.git
npm install
```

### 2. Generate a new local database encryption key

By default, the `did-provider-x` package has a default SQLite database password, but it's a good idea to modify and change this to a new key unique to your install.

```bash
$ veramo config gen-key

X25519 raw private key (hex encoded):

4a5aeb56c7956dd6f3312e7094130a03afc060b95621fa3a86577aaf2b67cc1d

You can use this key with @veramo/kms-local#SecretBox
# or replace the default agent.yml 'dbEncryptionKey' constant
```

<!-- Take the key generated and replace the value under `dbEncryptionKey` in the [`agent.yml`](https://github.com/ixofoundation/did-provider-x/blob/main/agent.yml) file. -->

### 3. Configure your ixo/Cosmos account keys and RPC endpoints

Configure the following properties under the `didManager` section:

1. `cosmosPayerMnemonic`: Mnemonic associated with your ixo/Comsos SDK account<!-- (https://docs.cheqd.io/node/docs/cheqd-cli/cheqd-cli-key-management)-->. This is only stored locally, and the mnemonic is used to reconstitute the account address and keys used to pay for the transaction.
2. `rpcUrl`: You can specify a Cosmos SDK RPC endpoint. This endpoint is where transactions are sent to. By default, this is populated with `juno-rpc.polkachu.com` (for _mainnet_) and `testnet.ixo.earth/rpc` (for _testnet_) and `devnet.ixo.earth/rpc` (for _devnet_), but you can can modify this to [a different hosted RPC endpoint for ixo](https://cosmos.directory/ixo/nodes) or even your own local/private RPC endpoint.
3. `defaultProvider` (optional): The default ixo network is set to `testnet` to allow developers to test out network functionality. However, if you prefer, you can switch this out to `mainnet` or `devnet` instead.

### 4. Verify your configuration file is correct

IMPORTANT: Not possible at the moment as the package only has functionality for resolver and base provider implementation without creating own agent.

Once you've completed the steps above, verify that your Veramo configuration is accurate using the following command. If your configuration is correct, you should get a success message like the one below.

```bash
$ veramo config check -f <path/to/>agent.yml

Your Veramo configuration seems fine. An agent can be created and the 'agent.execute()' method can be called on it.
```

## 🙋 Find us here

[![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/invite/ixo) [![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/ixonetwork)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/ixoworld)
[![Medium](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/ixo-blog)
