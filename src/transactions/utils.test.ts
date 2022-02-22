import { Keypair } from "@solana/web3.js";
import { loadWallets } from "./utils";

test("loadWallets", () => {
  const expectedStoreWallet = Keypair.generate();
  const wallet = expectedStoreWallet.publicKey.toBase58();
  const expectedTixMint = Keypair.generate();
  process.env.NEXT_PUBLIC_TIX_MINT_ADDRESS =
    expectedTixMint.publicKey.toBase58();
  const { storeWallet, tixMint } = loadWallets(wallet);
  expect(storeWallet).toStrictEqual(expectedStoreWallet.publicKey);
  expect(tixMint).toStrictEqual(expectedTixMint.publicKey);
});
