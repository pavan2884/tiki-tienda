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
  TransactionInstruction,
} from "@solana/web3.js";
import axios from "axios";
import { connection, keyMap } from "../config";
import {
  createAssociatedTokenAccountInstruction,
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
    const { context, value } = await connection.confirmTransaction(signature, "processed");
    console.log("Confirmed transaction for payment", signature, context, value);
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

const nftTransaction = async (
  nftToTransfer: Account,
  userWalletB58: string,
  storeWalletB58: string
) => {
  const nftMintPk = new PublicKey(nftToTransfer.account.data.parsed.info.mint);
  const userWallet = new PublicKey(userWalletB58);
  const userNftAccount = await getAssociatedTokenAddress(nftMintPk, userWallet);
  const storeWallet = new PublicKey(storeWalletB58);
  const storeNftAccount = await getAssociatedTokenAddress(
    nftMintPk,
    storeWallet
  );
  const instructions: TransactionInstruction[] = [];
  const receiverAccount = await connection.getAccountInfo(storeNftAccount);
  if (!receiverAccount) {
    instructions.push(
      createAssociatedTokenAccountInstruction(
        nftMintPk, storeNftAccount, userWallet, storeWallet
      )
    )
  }
  instructions.push(nftTransferInstruction(storeNftAccount, userNftAccount, storeWallet));
  return new Transaction().add(...instructions);
}

const transferNft = async (
  nftToTransfer: Account,
  userWalletB58: string,
  storeWalletB58: string,
  signature: string
): Promise<string> => {
  console.log("Nft picked", nftToTransfer.account.data.parsed.info.mint);
  // const paymentTransaction = await connection.getTransaction(signature, { commitment: "confirmed" });
  // console.log("Payment transaction", paymentTransaction, signature);
  const transaction = await nftTransaction(nftToTransfer, userWalletB58, storeWalletB58);
  const storeWalletKeyPair = getKeypair(storeWalletB58);
  try {
    const newSignature = await sendAndConfirmTransaction(connection, transaction, [
      storeWalletKeyPair,
    ], {
      commitment: "processed",
      maxRetries: 3
    });
    console.log("Signature nft transfer", newSignature);
    return newSignature;
  } catch (error) {
    console.log("Nft send failed!!!!", error);
  }
  return "Transaction failed";
};

export { processTransaction, transferNft };
