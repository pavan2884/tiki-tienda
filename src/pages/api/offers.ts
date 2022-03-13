import { Connection, PublicKey } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { nftCount } from "../../accounts";
import { offers, url } from "../../config";

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
  const connection = new Connection(url, "confirmed");
  try {
    await Promise.all(
      offers.map(async (offer) => {
        offer.remaining = await nftCount(
          new PublicKey(offer.wallet58),
          connection
        );
      })
    );
    res.status(200).json({
      offers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(new Error("Internal server error"));
  }
}
