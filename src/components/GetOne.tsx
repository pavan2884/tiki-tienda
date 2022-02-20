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

export default function GetOne() {
  const { connection } = useConnection();
  const { publicKey: userWallet, sendTransaction } = useWallet();

  const handleClick = async () => {
    if (!userWallet) throw new WalletNotConnectedError();
    const { storeWallet, tixMint } = loadWallets();
    const storeAccount = await getAssociatedTokenAddress(tixMint, storeWallet);
    const userAccount = await getAssociatedTokenAddress(tixMint, userWallet);
    const transaction = new Transaction().add(
      tixTransferInstruction(userAccount, storeAccount, userWallet),
      solTransferInstruction(userWallet, storeWallet)
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
