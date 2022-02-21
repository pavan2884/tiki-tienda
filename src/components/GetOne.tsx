import { Button, Typography } from "@mui/material";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  loadWallets,
  solTransferInstruction,
  tixTransferInstruction,
} from "../utils/instructions";

export default function GetOne({ wallet }: { wallet: string }) {
  const { connection } = useConnection();
  const { publicKey: userWallet, sendTransaction } = useWallet();

  const handleClick = async () => {
    if (!userWallet) throw new WalletNotConnectedError();
    const { storeWallet, tixMint } = loadWallets(wallet);
    const storeTixAccount = await getAssociatedTokenAddress(
      tixMint,
      storeWallet
    );
    const userTixAccount = await getAssociatedTokenAddress(tixMint, userWallet);
    const transaction = new Transaction().add(
      tixTransferInstruction(userTixAccount, storeTixAccount, userWallet),
      solTransferInstruction(userWallet, storeWallet)
    );
    try {
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "processed");
    } catch (error) {
      console.log("Transaction send/confirm failed", error);
    }
    // await completeSale(publicKey, signature);
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      <Typography variant="h3">Get One!</Typography>
    </Button>
  );
}
