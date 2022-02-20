import type { NextApiRequest, NextApiResponse } from "next";

type Offer = {
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
    offers: [
      {
        name: "Sovana",
        remaining: "3/7",
        cost: 44,
        image:
          "https://dl.airtable.com/.attachmentThumbnails/132a746ad38e113c7880c7b66f319ecd/e58d73b6",
      },
      {
        name: "Famous Fox Federation",
        remaining: "3/7",
        cost: 44,
        image:
          "https://ipfs.io/ipfs/Qmetu9eyf7jxE9cNV9MYMWborQBGHqurt1MvD2LjwDcumy",
      },
      {
        name: "DeGods",
        remaining: "3/7",
        cost: 44,
        image: "https://i.imgur.com/2kWcR3L.jpeg",
      },
    ],
  });
}
