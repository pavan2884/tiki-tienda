import { Connection } from "@solana/web3.js";

const network =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";
const connection = new Connection(network, "confirmed");

const honeypot = {
  wallet: process.env.HONEYPOT_WALLET_ADDRESS,
  cost: 15,
};

const offers = [
  {
    wallet58: process.env.OFFER_1_WALLET_ADDRESS || "",
    name: "Sovana",
    cost: 74,
    remaining: 0,
    image:
      "https://dl.airtable.com/.attachmentThumbnails/132a746ad38e113c7880c7b66f319ecd/e58d73b6",
  },
  {
    wallet58: process.env.OFFER_2_WALLET_ADDRESS || "",
    name: "Famous Fox Federation",
    cost: 40,
    remaining: 0,
    image:
      "https://ipfs.io/ipfs/Qmetu9eyf7jxE9cNV9MYMWborQBGHqurt1MvD2LjwDcumy",
  },
  {
    wallet58: process.env.OFFER_3_WALLET_ADDRESS || "",
    name: "DeGods",
    cost: 34,
    remaining: 0,
    image: "https://i.imgur.com/2kWcR3L.jpeg",
  },
];

const keyMap = (wallet58: string) => {
  switch (wallet58) {
    case process.env.HONEYPOT_WALLET_ADDRESS:
      return process.env.HONEYPOT_WALLET_PRIVATE;
    case process.env.OFFER_1_WALLET_ADDRESS:
      return process.env.OFFER_1_WALLET_PRIVATE;
    case process.env.OFFER_2_WALLET_ADDRESS:
      return process.env.OFFER_2_WALLET_PRIVATE;
    case process.env.OFFER_3_WALLET_ADDRESS:
      return process.env.OFFER_3_WALLET_PRIVATE;
    default:
      throw new Error("Unknown wallet!!!!!!!!!!");
  }
};

export { connection, honeypot, offers, keyMap };
