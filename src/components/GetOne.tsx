import { useState } from "react";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { processTransaction } from "../transactions";
import { nftCount } from "../accounts";

export default function GetOne({ wallet }: { wallet: string }) {
  const { connection } = useConnection();
  const { publicKey: userWallet, sendTransaction } = useWallet();
  const [open, setOpen] = useState(false);

  const onClick = async () => {
    const totalLeft = await nftCount(wallet);
    if (totalLeft > 0) {
      await processTransaction(userWallet, wallet, connection, sendTransaction);
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
          height: "80%",
          overflow: "visible",
          backgroundImage: "url(/assets/blank-bar.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 80%",
        }}
        onClick={onClick}
      >
        <Typography
          sx={{
            paddingBottom: 1,
          }}
          color="#02f077"
          variant="h5"
          align="center"
        >
          Get One!
        </Typography>
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          No NFTs left!!!!
        </Alert>
      </Snackbar>
    </Box>
  );
}
