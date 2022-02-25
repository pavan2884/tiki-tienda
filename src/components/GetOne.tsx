import { useState } from "react";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { processTransaction } from "../transactions";
import { nftCount } from "../accounts";

type Props = {
  wallet: string;
  cost: number;
};

export default function GetOne({ wallet, cost }: Props) {
  const { connection } = useConnection();
  const { publicKey: userWallet, sendTransaction } = useWallet();
  const [open, setOpen] = useState(false);

  const onClick = async () => {
    const totalLeft = await nftCount(wallet);
    if (totalLeft > 0) {
      await processTransaction(
        userWallet,
        wallet,
        cost,
        connection,
        sendTransaction
      );
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button
        sx={{
          width: "100%",
          height: "100%",
          overflow: "visible",
          backgroundImage: "url(/assets/blank-bar.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 80%",
        }}
        onClick={onClick}
      >
        <Typography
          sx={{
            paddingBottom: 2,
          }}
          color="#02f077"
          variant="h4"
          align="center"
        >
          Get One!
        </Typography>
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Sold out!!!
        </Alert>
      </Snackbar>
    </Box>
  );
}
