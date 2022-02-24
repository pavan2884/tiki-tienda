import { Connection } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { pickAnNft } from "../../accounts";
import { transferNft } from "../../transactions";

const networkURL = "https://api.devnet.solana.com";
const connection = new Connection(networkURL, "confirmed");

type Data = {
  userWalletB58: string;
  storeWalletB58: string;
  signature: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("api/getone", req.body);
  const { userWalletB58, storeWalletB58 }: Data = req.body;

  try {
    const nftToTransfer = await pickAnNft(storeWalletB58, connection);
    const result = await transferNft(
      connection,
      nftToTransfer,
      userWalletB58,
      storeWalletB58
    );
    return res.status(200).json({ signature: result });
  } catch (error) {
    console.log(error);
  }
  return res.status(500).json(new Error("Internal server error"));
}
