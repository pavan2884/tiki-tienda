// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  AccountInfo,
  Connection,
  ParsedAccountData,
  PublicKey,
} from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import util from "util";
import { transferNft } from "../../transactions";

const networkURL = "https://api.devnet.solana.com";
const connection = new Connection(networkURL, "confirmed");

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

const pickAnNft = async (storeWalletB58: string) => {
  const nftAccounts = getNftAccounts(
    await getTokenAccounts(storeWalletB58, connection)
  );
  return nftAccounts[(Math.random() * nftAccounts.length) | 0];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userWalletB58, storeWalletB58, signature }: Data = req.body;
  console.log("api/getone", userWalletB58, storeWalletB58, signature);

  try {
    const nftToTransfer = await pickAnNft(storeWalletB58);
    await transferNft(connection, nftToTransfer, userWalletB58, storeWalletB58);
    return res.status(200);
  } catch (error) {
    return res.status(500);
  }
}
