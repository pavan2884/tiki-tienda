const honeypot = {
  wallet: process.env.HONEYPOT_WALLET_ADDRESS,
  cost: 15,
};

const offers = [
  {
    wallet58: process.env.OFFER_1_WALLET_ADDRESS || "",
    name: "Sovana",
    remaining: "3/7",
    cost: 44,
    image:
      "https://dl.airtable.com/.attachmentThumbnails/132a746ad38e113c7880c7b66f319ecd/e58d73b6",
  },
  {
    wallet58: process.env.OFFER_2_WALLET_ADDRESS || "",
    name: "Famous Fox Federation",
    remaining: "3/7",
    cost: 44,
    image:
      "https://ipfs.io/ipfs/Qmetu9eyf7jxE9cNV9MYMWborQBGHqurt1MvD2LjwDcumy",
  },
  {
    wallet58: process.env.OFFER_3_WALLET_ADDRESS || "",
    name: "DeGods",
    remaining: "3/7",
    cost: 44,
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

export { honeypot, offers, keyMap };
