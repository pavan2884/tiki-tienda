import type { NextApiRequest, NextApiResponse } from "next";

import { honeypot } from "../../config";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  if (process.env.HONEYPOT_WALLET_ADDRESS) {
    res.status(200).json(honeypot);
  } else {
    res.status(500).json(new Error("Internal server error"));
  }
}
