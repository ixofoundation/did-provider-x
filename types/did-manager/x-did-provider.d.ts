import { DIDDocument } from "did-resolver";
import { IIdentifier, IKey, IService, IAgentContext, IKeyManager } from "@veramo/core";
import { AbstractIdentifierProvider } from "@veramo/did-manager";
import { EnglishMnemonic as _ } from "@cosmjs/crypto";
type IContext = IAgentContext<IKeyManager>;
export declare enum DefaultRPCUrl {
    Mainnet = "https://juno-rpc.polkachu.com/",
    Testnet = "https://testnet.ixo.earth/rpc/",
    Devnet = "https://devnet.ixo.earth/rpc/"
}
export declare enum NetworkType {
    Mainnet = "mainnet",
    Testnet = "testnet",
    Devnet = "devnet"
}
export type TImportableEd25519Key = Required<Pick<IKey, "publicKeyHex" | "privateKeyHex">> & {
    kid: TImportableEd25519Key["publicKeyHex"];
    type: "Ed25519";
};
export type TSupportedKeyType = "Ed25519" | "Secp256k1";
export declare class EnglishMnemonic extends _ {
    static readonly _mnemonicMatcher: RegExp;
}
/**
 * {@link @veramo/did-manager#DIDManager} identifier provider for `did:x/ixo` identifiers.
 * @public
 */
export declare class IxoDIDProvider extends AbstractIdentifierProvider {
    private defaultKms;
    readonly network: NetworkType;
    private rpcUrl;
    constructor(options: {
        defaultKms: string;
        cosmosPayerSeed: string;
        networkType?: NetworkType;
        rpcUrl?: string;
    });
    createIdentifier({ kms, options, }: {
        kms?: string;
        alias?: string;
        options: {
            document: DIDDocument;
            keys: TImportableEd25519Key[];
            versionId?: string;
        };
    }, context: IContext): Promise<Omit<IIdentifier, "provider">>;
    updateIdentifier({ did, document, options, }: {
        did: string;
        document: DIDDocument;
        options: {
            kms: string;
            keys: TImportableEd25519Key[];
            versionId?: string;
        };
    }, context: IContext): Promise<IIdentifier>;
    deleteIdentifier(identity: IIdentifier, context: IContext): Promise<boolean>;
    addKey({ identifier, key, options, }: {
        identifier: IIdentifier;
        key: IKey;
        options?: any;
    }, context: IContext): Promise<any>;
    addService({ identifier, service, options, }: {
        identifier: IIdentifier;
        service: IService;
        options?: any;
    }, context: IContext): Promise<any>;
    removeKey(args: {
        identifier: IIdentifier;
        kid: string;
        options?: any;
    }, context: IContext): Promise<any>;
    removeService(args: {
        identifier: IIdentifier;
        id: string;
        options?: any;
    }, context: IContext): Promise<any>;
}
export {};
