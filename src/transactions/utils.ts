import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";

const getAssociatedTokenAddress = async (
  mint: PublicKey,
  wallet: PublicKey
) => {
  return await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    mint,
    wallet
  );
};

const solTransferInstruction = (
  userWallet: PublicKey,
  storeWallet: PublicKey
) => {
  return SystemProgram.transfer({
    fromPubkey: userWallet,
    toPubkey: storeWallet,
    lamports: 0.009 * LAMPORTS_PER_SOL,
  });
};

const nftTransferInstruction = (
  fromAccount: PublicKey,
  toAccount: PublicKey,
  payeeWallet: PublicKey
) => {
  return Token.createTransferInstruction(
    TOKEN_PROGRAM_ID,
    fromAccount,
    toAccount,
    payeeWallet,
    [],
    1 * LAMPORTS_PER_SOL
  );
};

const tixTransferInstruction = (
  userAccount: PublicKey,
  storeAccount: PublicKey,
  userWallet: PublicKey
) => {
  return Token.createTransferInstruction(
    TOKEN_PROGRAM_ID,
    userAccount,
    storeAccount,
    userWallet,
    [],
    25 * LAMPORTS_PER_SOL
  );
};

const loadWallets = (wallet: string) => {
  const storeWalletAddress = wallet;
  const tixMintAddress = process.env.NEXT_PUBLIC_TIX_MINT_ADDRESS;
  if (!tixMintAddress)
    throw new Error("Environment not set propertly, missing tix mint address");

  const storeWallet = new PublicKey(storeWalletAddress);
  const tixMint = new PublicKey(tixMintAddress);

  return { storeWallet, tixMint };
};

// cannot save the proper array in env vars
const formatPrivateKeyArray = (key: string) => {
  // Removes brackets to make processing correct
  const csv = key.substring(1, key.length - 1);
  const array = csv.split(",", 64).map((s) => parseInt(s));
  return Uint8Array.from(array);
};

export {
  getAssociatedTokenAddress,
  solTransferInstruction,
  tixTransferInstruction,
  nftTransferInstruction,
  loadWallets,
  formatPrivateKeyArray,
};
