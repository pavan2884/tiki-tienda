import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { connection } from "../config";

const getTokenAccounts = async (walletPk: PublicKey) => {
  const { value: tokenAccounts } =
    await connection.getParsedTokenAccountsByOwner(walletPk, {
      programId: TOKEN_PROGRAM_ID,
    });
  return tokenAccounts;
};

const getNftAccounts = async (storeWalletPk: PublicKey) => {
  const tokenAccounts = await getTokenAccounts(storeWalletPk);
  // tokenAccounts.forEach(account => {
  //   console.log(util.inspect(account, false, 10, true))
  // })
  return tokenAccounts.filter(
    ({ account }) => account.data.parsed.info.tokenAmount.uiAmount === 1
  );
};

const pickAnNft = async (storeWalletPk: PublicKey) => {
  const nftAccounts = await getNftAccounts(storeWalletPk);
  return nftAccounts[(Math.random() * nftAccounts.length) | 0];
};

const nftCount = async (storeWalletPk: PublicKey) => {
  const nftAccounts = await getNftAccounts(storeWalletPk);
  return nftAccounts.length;
};

const getTixMintPk = () => {
  const tixMintAddress = process.env.NEXT_PUBLIC_TIX_MINT_ADDRESS;
  if (!tixMintAddress)
    throw new Error("Environment not set propertly, missing tix mint address");
  return new PublicKey(tixMintAddress);
};

const tixCount = async (userWalletPk: PublicKey) => {
  const tokenAccounts = await getTokenAccounts(userWalletPk);
  const account = tokenAccounts.find(
    ({ account }: any) =>
      account.data.parsed.info.mint === getTixMintPk().toBase58()
  );
  return !account ? 0 : account.account.data.parsed.info.tokenAmount.uiAmount;
};

export { getNftAccounts, pickAnNft, nftCount, tixCount, getTixMintPk };
