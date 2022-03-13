const url =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";

const storeCost = 0.05;

const honeypot = {
  wallet: process.env.HONEYPOT_WALLET_ADDRESS,
  cost: 100,
};

const offers = [
  {
    wallet58: process.env.OFFER_1_WALLET_ADDRESS || "",
    cost: 800,
    remaining: 0,
    name: "Famous Fox Federation",
    image:
      "https://ipfs.io/ipfs/Qmetu9eyf7jxE9cNV9MYMWborQBGHqurt1MvD2LjwDcumy",
  },
  {
    wallet58: process.env.OFFER_2_WALLET_ADDRESS || "",
    cost: 575,
    remaining: 0,
    name: "Xin Dragons",
    image:
      "https://dl.airtable.com/.attachmentThumbnails/b93f545349395105d22bfc113d388fd4/e6968838",
  },
  {
    wallet58: process.env.OFFER_3_WALLET_ADDRESS || "",
    cost: 175,
    remaining: 0,
    name: "Sovana",
    image:
      "https://dl.airtable.com/.attachmentThumbnails/132a746ad38e113c7880c7b66f319ecd/e58d73b6",
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

export { url, honeypot, offers, keyMap, storeCost };
