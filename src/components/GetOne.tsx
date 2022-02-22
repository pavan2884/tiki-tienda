import { Button, Typography } from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { processTransaction } from "../transactions";

export default function GetOne({ wallet }: { wallet: string }) {
  const { connection } = useConnection();
  const { publicKey: userWallet, sendTransaction } = useWallet();

  const onClick = async () =>
    await processTransaction(userWallet, wallet, connection, sendTransaction);

  return (
    <Button variant="contained" onClick={onClick}>
      <Typography variant="h3">Get One!</Typography>
    </Button>
  );
}
