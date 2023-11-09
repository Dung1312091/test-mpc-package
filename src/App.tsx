import { useEffect } from "react";
import { MPCClient } from "../lib";
const mpcClient = new MPCClient();

function App() {
  useEffect(() => {
    const sign = async () => {
      const rs = await mpcClient.keygen();
      console.log('🚀 ~ file: index.tsx:15 ~ sign ~ rs:', rs);
    };
    sign();
  }, []);
  return (
    <main className="h-full">
      AAAA
    </main>
  );
}

export default App;
