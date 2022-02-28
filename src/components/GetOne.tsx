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
  const [alertMsg, setAlertMsg] = useState("");

  const onClick = async () => {
    if (!userWalletPk) throw new WalletNotConnectedError();
    if (walletB58 === "false") {
      setAlertMsg("Sold Out!");
      setOpen(true);
      return;
    } //other sold out case to avoid crash
    const storeWalletPk = new PublicKey(walletB58);
    const tixLeft = await tixCount(userWalletPk);
    const nftLeft = await nftCount(storeWalletPk);
    if (tixLeft < cost) {
      setAlertMsg("Not enough Tix!");
      setOpen(true);
    } else if (nftLeft <= 0) {
      setAlertMsg("Sold Out!");
      setOpen(true);
    } else {
      const result = await processTransaction(
        userWalletPk,
        storeWalletPk,
        cost,
        connection,
        sendTransaction
      );
      if (result?.status === 200) {
        setAlertMsg("Transaction complete!");
      } else {
        setAlertMsg("Transaction failed!");
      }
      setOpen(true);
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
          onClick={onClick}
        >
          <Typography
            sx={{
              paddingBottom: 3,
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
        {alertMsg === "Transaction Complete ✅" ? (
          <Alert onClose={handleClose} sx={{ width: "100%" }}>
            {alertMsg}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {alertMsg}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
}
