import { Box, Button, Typography } from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { processTransaction } from "../transactions";

export default function GetOne({ wallet }: { wallet: string }) {
  const { connection } = useConnection();
  const { publicKey: userWallet, sendTransaction } = useWallet();

  const onClick = async () =>
    await processTransaction(userWallet, wallet, connection, sendTransaction);

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
    </Box>
  );
}
