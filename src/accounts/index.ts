import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { connection } from "../config";

const getTokenAccounts = async (walletString: string) => {
  const base58publicKey = new PublicKey(walletString);
  const { value: tokenAccounts } =
    await connection.getParsedTokenAccountsByOwner(base58publicKey, {
      programId: TOKEN_PROGRAM_ID,
    });
  return tokenAccounts;
};

const getNftAccounts = async (storeWalletB58: string) => {
  const tokenAccounts = await getTokenAccounts(storeWalletB58);
  // tokenAccounts.forEach(account => {
  //   console.log(util.inspect(account, false, 10, true))
  // })
  return tokenAccounts.filter(
    ({ account }) => account.data.parsed.info.tokenAmount.uiAmount === 1
  );
};

const pickAnNft = async (storeWalletB58: string) => {
  const nftAccounts = await getNftAccounts(storeWalletB58);
  return nftAccounts[(Math.random() * nftAccounts.length) | 0];
};

const nftCount = async (storeWalletB58: string) => {
  const nftAccounts = await getNftAccounts(storeWalletB58);
  return nftAccounts.length;
};

export { pickAnNft, nftCount };
