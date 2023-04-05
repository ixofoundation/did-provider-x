/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @typescript-eslint/no-non-null-assertion */
// any is used for extensibility
// unused vars are kept by convention
// non-null assertion is used when we know better than the compiler that the value is not null or undefined
import { DIDDocument } from 'did-resolver';
import { IIdentifier, IKey, IService, IAgentContext, IKeyManager } from '@veramo/core';
import { AbstractIdentifierProvider } from '@veramo/did-manager';
import { EnglishMnemonic as _ } from '@cosmjs/crypto';

type IContext = IAgentContext<IKeyManager>;

export enum DefaultRPCUrl {
	Mainnet = 'https://juno-rpc.polkachu.com/',
	Testnet = 'https://testnet.ixo.earth/rpc/',
	Devnet = 'https://devnet.ixo.earth/rpc/',
}

export enum NetworkType {
	Mainnet = 'mainnet',
	Testnet = 'testnet',
	Devnet = 'devnet',
}

export type TImportableEd25519Key = Required<Pick<IKey, 'publicKeyHex' | 'privateKeyHex'>> & { kid: TImportableEd25519Key['publicKeyHex']; type: 'Ed25519' };

export type TSupportedKeyType = 'Ed25519' | 'Secp256k1';

export class EnglishMnemonic extends _ {
	static readonly _mnemonicMatcher = /^[a-z]+( [a-z]+)*$/;
}

/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:x/ixo` identifiers.
 * @public
 */
export class IxoDIDProvider extends AbstractIdentifierProvider {
	private defaultKms: string;
	public readonly network: NetworkType;
	private rpcUrl: string;

	constructor(options: { defaultKms: string; cosmosPayerSeed: string; networkType?: NetworkType; rpcUrl?: string }) {
		super();
		this.defaultKms = options.defaultKms;
		this.network = options.networkType ? options.networkType : NetworkType.Testnet;
		this.rpcUrl = options.rpcUrl ? options.rpcUrl : this.network === NetworkType.Mainnet ? DefaultRPCUrl.Mainnet : this.network === NetworkType.Devnet ? DefaultRPCUrl.Devnet : DefaultRPCUrl.Testnet;
	}

	async createIdentifier(
		{ kms, options }: { kms?: string; alias?: string; options: { document: DIDDocument; keys: TImportableEd25519Key[]; versionId?: string } },
		context: IContext,
	): Promise<Omit<IIdentifier, 'provider'>> {
		throw Error('IxoDIDProvider createIdentifier is not supported.');
	}

	async updateIdentifier({ did, document, options }: { did: string; document: DIDDocument; options: { kms: string; keys: TImportableEd25519Key[]; versionId?: string } }, context: IContext): Promise<IIdentifier> {
		throw Error('IxoDIDProvider updateIdentifier is not supported.');
	}

	async deleteIdentifier(identity: IIdentifier, context: IContext): Promise<boolean> {
		throw Error('IxoDIDProvider deleteIdentifier is not supported.');
	}

	async addKey({ identifier, key, options }: { identifier: IIdentifier; key: IKey; options?: any }, context: IContext): Promise<any> {
		throw Error('IxoDIDProvider addKey is not supported.');
	}

	async addService({ identifier, service, options }: { identifier: IIdentifier; service: IService; options?: any }, context: IContext): Promise<any> {
		throw Error('IxoDIDProvider addService is not supported.');
	}

	async removeKey(
		args: {
			identifier: IIdentifier;
			kid: string;
			options?: any;
		},
		context: IContext,
	): Promise<any> {
		throw Error('IxoDIDProvider removeKey is not supported.');
	}

	async removeService(
		args: {
			identifier: IIdentifier;
			id: string;
			options?: any;
		},
		context: IContext,
	): Promise<any> {
		throw Error('IxoDIDProvider removeService is not supported.');
	}
}
