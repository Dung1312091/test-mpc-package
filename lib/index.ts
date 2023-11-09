/* eslint-disable @typescript-eslint/no-explicit-any */
import WasmLoader from "./wasmLoader";

export class MPCClient {
    #wasmLoader: WasmLoader;
    constructor() {
        this.#wasmLoader = new WasmLoader
    }
    public keygen  =  async():Promise<string>  => {
       await this.#wasmLoader.wasmBrowserModule();
       const key = await (globalThis as any).global.keygen();
       return key;
      };
      public signTransaction = async () => {
        await this.#wasmLoader.wasmBrowserModule();
        const signature = await (globalThis as any).global.signTransaction('a');
        return signature;

      };
}