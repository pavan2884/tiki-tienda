import type { NextApiRequest, NextApiResponse } from "next";
import { offers } from "../../config";
import { nftCount } from "../../accounts";
import { PublicKey } from "@solana/web3.js";

type Offer = {
  wallet58: string;
  name: string;
  remaining: number;
  cost: number;
  image: string;
};

type Data = {
  offers: Offer[];
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  try {
    offers.forEach(async (offer) => {
      offer.remaining = await nftCount(new PublicKey(offer.wallet58));
    });
    res.status(200).json({
      offers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(new Error("Internal server error"));
  }
}
