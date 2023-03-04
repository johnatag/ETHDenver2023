import { Magic } from "magic-sdk";


const createMagic = (key: string) => {
  return typeof window !== 'undefined' && new Magic(key as string, {
    network: {
      rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL as string,
      chainId: 80001,
    }
  })
}

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string);


