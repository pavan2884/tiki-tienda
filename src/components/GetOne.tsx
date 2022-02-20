import { Button, Typography } from "@mui/material";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
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

const url = '/api/sale';
const completeSale = (publicKey: PublicKey, signature: string) =>
  axios.get<Data>(url).then((res) => res.data);

const storeWallet = new PublicKey(process.env.NEXT_PUBLIC_TIX_WALLET || ""); //  Wallet that holds all the tix & tut
const tixMint = new PublicKey(process.env.NEXT_PUBLIC_TIX_ADDR || ""); // tix token public address


export default function GetOne() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  if (!publicKey) throw new WalletNotConnectedError();

  const handleClick = async () => {
    const storeAccount = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
      TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
      tixMint, // mint
      storeWallet // owner
    );

    const userAccount = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
      TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
      tixMint, // mint
      publicKey // owner
    );

    const sendTixToDevWallet = Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      userAccount,
      storeAccount,
      publicKey,
      [],
      25 * LAMPORTS_PER_SOL
    );

    const sendSolToDevWallet = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: storeWallet,
      lamports: 0.009 * LAMPORTS_PER_SOL,
    });

    const transaction = new Transaction().add(
      sendTixToDevWallet,
      sendSolToDevWallet
    );

    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, "processed");
    // await completeSale(publicKey, signature);
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      <Typography variant="h3">Get One!</Typography>
    </Button>
  );
}
