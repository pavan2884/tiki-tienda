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
import { getTixMintPk } from "../accounts";
import { connection, keyMap, storeCost } from "../config";
import {
  createAssociatedTokenAccountInstruction,
  formatPrivateKeyArray,
  getAssociatedTokenAddress,
  nftTransferInstruction,
  solTransferInstruction,
  tixTransferInstruction,
} from "./utils";

type Account = {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
};

const processTransaction = async (
  userWalletPk: PublicKey,
  storeWalletPk: PublicKey,
  cost: number,
  connection: Connection,
  sendTransaction: WalletContextState["sendTransaction"]
) => {
  console.log("Processing transaction");
  const tixMintPk = getTixMintPk();
  const storeTixAccount = await getAssociatedTokenAddress(
    tixMintPk,
    storeWalletPk
  );
  const userTixAccount = await getAssociatedTokenAddress(
    tixMintPk,
    userWalletPk
  );
  const transaction = new Transaction().add(
    tixTransferInstruction(userTixAccount, storeTixAccount, userWalletPk, cost),
    solTransferInstruction(userWalletPk, storeWalletPk, storeCost)
  );
  try {
    const signature = await sendTransaction(transaction, connection);
    console.log("Transaction for payment done");
    // const { context, value } = await connection.confirmTransaction(signature);
    // console.log("Confirmed transaction for payment", signature, context, value);
    const result = await axios.post("/api/getone", {
      userWalletB58: userWalletPk.toBase58(),
      storeWalletB58: storeWalletPk.toBase58(),
      signature,
    });
    console.log("Transaction done", result, signature);
    return result;
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
  userWalletPk: PublicKey,
  storeWalletPk: PublicKey
) => {
  const nftMintPk = new PublicKey(nftToTransfer.account.data.parsed.info.mint);
  console.log(
    "Mint",
    nftToTransfer.account.data.parsed.info.mint,
    nftMintPk.toBase58()
  );
  const storeNftAccount = await getAssociatedTokenAddress(
    nftMintPk,
    storeWalletPk
  );
  console.log("storeNftAccount", storeNftAccount.toBase58());
  const userNftAccount = await getAssociatedTokenAddress(
    nftMintPk,
    userWalletPk
  );
  console.log("userNftAccount", userNftAccount.toBase58());
  const instructions: TransactionInstruction[] = [];
  const receiverAccount = await connection.getAccountInfo(userNftAccount);
  if (!receiverAccount) {
    console.log("Creating associated token account", userNftAccount.toBase58());
    instructions.push(
      createAssociatedTokenAccountInstruction(
        nftMintPk,
        userNftAccount,
        userWalletPk,
        storeWalletPk
      )
    );
  }
  console.log(
    "nftTransferInstruction",
    storeNftAccount.toBase58(),
    userNftAccount.toBase58(),
    storeWalletPk.toBase58()
  );
  instructions.push(
    nftTransferInstruction(storeNftAccount, userNftAccount, storeWalletPk)
  );
  return new Transaction().add(...instructions);
};

const transferNft = async (
  nftToTransfer: Account,
  userWalletPk: PublicKey,
  storeWalletPk: PublicKey,
  signature: string
): Promise<string> => {
  console.log("Nft picked", nftToTransfer.account.data.parsed.info.mint);
  // const paymentTransaction = await connection.getTransaction(signature, { commitment: "confirmed" });
  // console.log("Payment transaction", paymentTransaction, signature);
  const transaction = await nftTransaction(
    nftToTransfer,
    userWalletPk,
    storeWalletPk
  );
  const storeWalletKeyPair = getKeypair(storeWalletPk.toBase58());
  try {
    const newSignature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [storeWalletKeyPair],
      {
        commitment: "processed",
        maxRetries: 3,
      }
    );
    console.log("Signature nft transfer", newSignature);
    return newSignature;
  } catch (error) {
    console.log("Nft send failed!!!!", error);
  }
  return "Transaction failed";
};

export { processTransaction, transferNft };
