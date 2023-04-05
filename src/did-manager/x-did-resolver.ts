import axios from "axios";
import {
  DIDResolutionOptions,
  DIDResolutionResult,
  DIDResolver,
  ParsedDID,
  Resolvable,
} from "did-resolver";

interface Options {
  url: string;
}

/**
 * Creates a IxoDIDResolver instance that can be used with `did-resolver`.
 * @public
 */
export function getResolver(options?: Options): Record<string, DIDResolver> {
  if (options?.url) return new IxoDidResolver(options).build();

  return new IxoDidResolver().build();
}

/**
 * IxoDIDResolver instance that can be used with `did-resolver`.
 * @public
 */
export class IxoDidResolver {
  private resolverUrl = "https://resolver.ixo.world/1.0/identifiers/";

  constructor(options?: Options) {
    if (options?.url) this.resolverUrl = options.url;
  }

  async resolve(
    did: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parsed: ParsedDID,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _unused: Resolvable,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: DIDResolutionOptions
  ): Promise<DIDResolutionResult> {
    try {
      const result = await axios.get(this.resolverUrl + did, {
        headers: { "Content-Type": "application/did+json" },
      });
      const ddo = result.data as DIDResolutionResult;
      return ddo;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  build(): Record<string, DIDResolver> {
    return { ixo: this.resolve.bind(this), x: this.resolve.bind(this) };
  }
}
