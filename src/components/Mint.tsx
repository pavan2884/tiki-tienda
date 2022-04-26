import {
  Alert,
  AlertColor,
  Box,
  Button,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";
import {
  awaitTransactionSignatureConfirmation,
  CandyMachineAccount,
  getCandyMachineState,
  mintOneToken,
} from "../candy-machine";

const txTimeout = 30000; // milliseconds (confirm this works for your project)

function getCandyMachineId() {
  if (!process.env.NEXT_PUBLIC_REACT_APP_CANDY_MACHINE_ID) {
    throw new Error("NEXT_PUBLIC_REACT_APP_CANDY_MACHINE_ID not set!!!!");
  }
  return new PublicKey(process.env.NEXT_PUBLIC_REACT_APP_CANDY_MACHINE_ID);
}

type AlertState = {
  open: boolean;
  message: string;
  severity: AlertColor;
};

export default function Mint() {
  const { connection } = useConnection();
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
  const [yourSOLBalance, setYourSOLBalance] = useState(0);
  const [isMinting, setIsMinting] = useState(false);
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: "success",
  });

  const wallet = useWallet();

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    };
  }, [wallet]);

  const candyMachineId = getCandyMachineId();
  useEffect(() => {
    (async () => {
      if (!anchorWallet) {
        return;
      }

      try {
        const balance = await connection.getBalance(anchorWallet.publicKey);
        setYourSOLBalance(balance);
      } catch (e) {
        console.log("Problem getting fair launch state");
        console.log(e);
      }

      if (candyMachineId) {
        try {
          const cndy = await getCandyMachineState(
            anchorWallet,
            candyMachineId,
            connection
          );
          setCandyMachine(cndy);
        } catch (e) {
          console.log("Problem getting candy machine state");
          console.log(e);
        }
      } else {
        console.log("No candy machine detected in configuration.");
      }
    })();
  }, [anchorWallet, candyMachineId.toBase58(), connection]);

  const onMint = async () => {
    try {
      setIsMinting(true);

      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        const mintTxId = (
          await mintOneToken(candyMachine, wallet.publicKey)
        )[0];

        let status: any = { err: true };
        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
            txTimeout,
            connection,
            "singleGossip",
            true
          );
        }

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (!error.message) {
          message = "Transaction Timeout! Please try again.";
        } else if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          window.location.reload();
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }
      console.log(message);

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      setIsMinting(false);
    }
  };

  const itemsRemaining = candyMachine?.state.itemsRemaining;
  const itemsAvailable = candyMachine?.state.itemsAvailable;
  return (
    <Box sx={{ height: "100%", paddingLeft: "2vw", marginTop: -3 }}>
      <Stack spacing={0.5}>
        <Button
          sx={{
            width: 420,
            height: "100%",
            backgroundImage: "url(/assets/blank-bar.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            display: "flex",
            align: "left",
            overflow: "visible",
          }}
          onClick={onMint}
        >
          <Stack spacing={0.5}>
            <Typography color="#00fff1" alignSelf="left" variant="h4">
              Mint Village ({itemsRemaining}/{itemsAvailable} left)
            </Typography>
            <Typography color="#00fff1" alignSelf="left" variant="h6">
              Requires 1 mint key + 3000 $TUT
            </Typography>
          </Stack>
        </Button>
      </Stack>
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
