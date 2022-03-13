import { Connection, PublicKey } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { pickAnNft } from "../../accounts";
import { transferNft } from "../../transactions";
import { url } from "../../config";

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
  const { userWalletB58, storeWalletB58, signature }: Data = req.body;
  const userWalletPk = new PublicKey(userWalletB58);
  const storeWalletPk = new PublicKey(storeWalletB58);

  const connection = new Connection(url, "confirmed");

  try {
    const nftToTransfer = await pickAnNft(storeWalletPk, connection);
    const result = await transferNft(
      nftToTransfer,
      userWalletPk,
      storeWalletPk,
      signature,
      connection
    );
    return res.status(200).json({ signature: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json(new Error("Internal server error"));
  }
}
