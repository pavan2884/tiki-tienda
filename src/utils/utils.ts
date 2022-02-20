import { PublicKey } from "@solana/web3.js";
import axios from "axios";

type Offer = {
  name: string;
  remaining: string;
  cost: number;
  image: string;
};

type Data = {
  offers: Offer[];
};

const url = "/api/sale";
const completeSale = (publicKey: PublicKey, signature: string) =>
  axios.get<Data>(url).then((res) => res.data);

exports = {
  completeSale,
};
