// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  AccountInfo,
  Connection,
  Keypair,
  ParsedAccountData,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import util from "util";
import {
  getAssociatedTokenAddress,
  nftTransferInstruction,
} from "../../utils/instructions";

const networkURL = "https://api.devnet.solana.com";

type Data = {
  userWalletB58: string;
  storeWalletB58: string;
  signature: string;
};

type Account = {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
};

type Accounts = Array<Account>;

const getNftAccounts = (tokenAccounts: Accounts) => {
  // tokenAccounts.forEach(account => {
  //   console.log(util.inspect(account, false, 10, true))
  // })
  return tokenAccounts.filter(
    ({ account }) => account.data.parsed.info.tokenAmount.uiAmount === 1
  );
};

const getTokenAccounts = async (
  walletString: string,
  connection: Connection
) => {
  const base58publicKey = new PublicKey(walletString);
  const programId = new PublicKey(
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
  );
  const { value: tokenAccounts } =
    await connection.getParsedTokenAccountsByOwner(base58publicKey, {
      programId,
    });
  return tokenAccounts;
};

// cannot save the proper array in env vars
const formatPrivateKeyArray = (key: string) => {
  // Removes brackets to make processing correct
  const csv = key.substring(1, key.length - 1);
  const array = csv.split(",", 64).map((s) => parseInt(s));
  return Uint8Array.from(array);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const storeWalletPrivateEnv = process.env.HONEYPOT_WALLET_PRIVATE;
  if (!storeWalletPrivateEnv) {
    return res.status(500);
  }
  const { userWalletB58, storeWalletB58, signature }: Data = req.body;
  console.log("api/getone", userWalletB58, storeWalletB58, signature);

  const connection = new Connection(networkURL, "confirmed");
  const nftAccounts = getNftAccounts(
    await getTokenAccounts(storeWalletB58, connection)
  );
  const nftToTransfer = nftAccounts[(Math.random() * nftAccounts.length) | 0];
  console.log("nftToTransfer", util.inspect(nftToTransfer, false, 10, true));
  const nftMint = nftToTransfer.account.data.parsed.info.mint;

  const userWallet = new PublicKey(userWalletB58);
  const storeWallet = new PublicKey(storeWalletB58);

  const storeNftAccount = await getAssociatedTokenAddress(nftMint, storeWallet);
  const userNftAccount = await getAssociatedTokenAddress(nftMint, userWallet);

  const transaction = new Transaction().add(
    nftTransferInstruction(storeNftAccount, userNftAccount, storeWallet)
  );

  const storeWalletPrivate = formatPrivateKeyArray(storeWalletPrivateEnv);
  console.log(storeWalletPrivate);
  const storeWalletKeyPair = Keypair.fromSecretKey(storeWalletPrivate);
  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      storeWalletKeyPair,
    ]);
    console.log("Nft send successful", signature);
  } catch (error) {
    console.log("Nft send failed!!!!", error);
  }

  return res.status(200);
}
