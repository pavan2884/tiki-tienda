import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  wallet: string;
  price: number;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.HONEYPOT_WALLET_ADDRESS) {
    res.status(200).json({
      wallet: process.env.HONEYPOT_WALLET_ADDRESS,
      price: 15,
    });
  } else {
    res.status(500);
  }
}
