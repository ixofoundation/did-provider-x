import { DIDResolutionOptions, DIDResolutionResult, DIDResolver, ParsedDID, Resolvable } from "did-resolver";
interface Options {
    url: string;
}
/**
 * Creates a IxoDIDResolver instance that can be used with `did-resolver`.
 * @public
 */
export declare function getResolver(options?: Options): Record<string, DIDResolver>;
/**
 * IxoDIDResolver instance that can be used with `did-resolver`.
 * @public
 */
export declare class IxoDidResolver {
    private resolverUrl;
    constructor(options?: Options);
    resolve(did: string, parsed: ParsedDID, _unused: Resolvable, options: DIDResolutionOptions): Promise<DIDResolutionResult>;
    build(): Record<string, DIDResolver>;
}
export {};
