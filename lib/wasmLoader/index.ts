/* eslint-disable @typescript-eslint/no-explicit-any */
import './wasm_exec.js';

export default class WasmLoader {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  go: any;
  constructor() {
    this.go = new (globalThis as any).global.Go();
  }
  private wasmBrowserInstantiate = async (wasmModuleUrl: URL, importObject?: WebAssembly.Imports) => {
    let response = undefined;

    if (!importObject) {
      importObject = {
        env: {
          abort: () => console.log('Abort!'),
        },
      };
    }

    if (WebAssembly.instantiateStreaming) {
      response = await WebAssembly.instantiateStreaming(fetch(wasmModuleUrl), importObject);
    } else {
      const fetchAndInstantiateTask = async () => {
        const wasmArrayBuffer = await fetch(wasmModuleUrl).then((response) => response.arrayBuffer());
        return WebAssembly.instantiate(wasmArrayBuffer, importObject);
      };
      response = await fetchAndInstantiateTask();
    }
    return response;
  };

  public wasmBrowserModule = async (): Promise<WebAssembly.WebAssemblyInstantiatedSource> => {
    const importObject = this.go.importObject;
    const wasmModule = await this.wasmBrowserInstantiate(new URL('main.wasm', import.meta.url), importObject);
    this.go.run(wasmModule.instance);

    return wasmModule;
  };
}
