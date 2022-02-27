import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { nftCount, tixCount } from "../accounts";
import { processTransaction } from "../transactions";

import { PublicKey } from "@solana/web3.js";

type Props = {
  walletB58: string;
  cost: number;
};

export default function GetOne({ walletB58, cost }: Props) {
  const { connection } = useConnection();
  const { publicKey: userWalletPk, sendTransaction } = useWallet();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const onClick = async () => {
    if (!userWalletPk) throw new WalletNotConnectedError();
    const storeWalletPk = new PublicKey(walletB58);
    const tixLeft = await tixCount(userWalletPk);
    const nftLeft = await nftCount(storeWalletPk);
    if (tixLeft < cost) {
      setError("Not enough Tix!!!");
      setOpen(true);
    } else if (nftLeft <= 0) {
      setError("Sold Out!!!");
      setOpen(true);
    } else {
      await processTransaction(
        userWalletPk,
        storeWalletPk,
        cost,
        connection,
        sendTransaction
      );
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Box>
      {walletB58 === "false" ? (
        <Button
          sx={{
            width: "100%",
            height: "100%",
            overflow: "visible",
            backgroundImage: "url(/assets/blank-bar.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 80%",
            cursor: "default",
          }}
        >
          <Typography
            sx={{
              paddingBottom: 2.5,
            }}
            color="#9a9c9c"
            variant="h4"
            align="center"
          >
            Sold Out
          </Typography>
        </Button>
      ) : (
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
              paddingBottom: 3,
            }}
            color="#02f077"
            variant="h3"
            align="center"
          >
            Get One!
          </Typography>
        </Button>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
