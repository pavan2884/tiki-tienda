import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  AccountInfo,
  Connection,
  Keypair,
  ParsedAccountData,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import axios from "axios";
import { connection, keyMap } from "../config";
import {
  formatPrivateKeyArray,
  getAssociatedTokenAddress,
  loadWallets,
  nftTransferInstruction,
  solTransferInstruction,
  tixTransferInstruction,
} from "./utils";

type Account = {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
};

const processTransaction = async (
  userWallet: PublicKey | null,
  wallet: string,
  cost: number,
  connection: Connection,
  sendTransaction: WalletContextState["sendTransaction"]
) => {
  if (!userWallet) throw new WalletNotConnectedError();
  const { storeWallet, tixMint } = loadWallets(wallet);
  const storeTixAccount = await getAssociatedTokenAddress(tixMint, storeWallet);
  const userTixAccount = await getAssociatedTokenAddress(tixMint, userWallet);
  const transaction = new Transaction().add(
    tixTransferInstruction(userTixAccount, storeTixAccount, userWallet, cost),
    solTransferInstruction(userWallet, storeWallet)
  );
  try {
    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, "processed");
    console.log("Payment done");
    const result = await axios.post("/api/getone", {
      userWalletB58: userWallet.toBase58(),
      storeWalletB58: storeWallet.toBase58(),
      signature,
    });
    console.log("Transaction done", result, signature);
  } catch (error) {
    console.log("Transaction send/confirm failed", error);
  }
};

const getKeypair = (wallet58: string) => {
  const storeWalletPrivateEnv = keyMap(wallet58);
  if (!storeWalletPrivateEnv) {
    throw new Error("Missing private key");
  }
  const storeWalletKeyPair = Keypair.fromSecretKey(
    formatPrivateKeyArray(storeWalletPrivateEnv)
  );
  return storeWalletKeyPair;
};

const transferNft = async (
  nftToTransfer: Account,
  userWalletB58: string,
  storeWalletB58: string
): Promise<string> => {
  console.log("Nft picked", nftToTransfer.account.data.parsed.info.mint);
  const nftMintPk = new PublicKey(nftToTransfer.account.data.parsed.info.mint);

  const userWallet = new PublicKey(userWalletB58);
  const userNftAccount = await getAssociatedTokenAddress(nftMintPk, userWallet);

  const storeWallet = new PublicKey(storeWalletB58);
  const storeNftAccount = await getAssociatedTokenAddress(
    nftMintPk,
    storeWallet
  );

  const transaction = new Transaction().add(
    nftTransferInstruction(storeNftAccount, userNftAccount, storeWallet)
  );

  const storeWalletKeyPair = getKeypair(storeWalletB58);

  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      storeWalletKeyPair,
    ]);
    console.log("Signature", signature);
    return signature;
  } catch (error) {
    console.log("Nft send failed!!!!", error);
  }
  return "Transaction failed";
};

export { processTransaction, transferNft };
