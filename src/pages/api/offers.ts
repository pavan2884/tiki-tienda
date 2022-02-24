import type { NextApiRequest, NextApiResponse } from "next";
import { offers } from "../../config";

type Offer = {
  wallet58: string;
  name: string;
  remaining: string;
  cost: number;
  image: string;
};

type Data = {
  offers: Offer[];
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    offers,
  });
}
