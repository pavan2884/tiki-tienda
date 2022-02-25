import Box from "@mui/material/Box";
import { useWalletDialog } from "@solana/wallet-adapter-material-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import ConnectSignImage from "../../public/assets/connect-wallet-wood.png";

const ConnectWallet = () => {
  const { setOpen } = useWalletDialog();
  const wallet = useAnchorWallet();
  const clickHandler = () => !wallet && setOpen(true);
  return (
    <Box
      sx={{ cursor: "pointer" }}
      display="flex"
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src={ConnectSignImage}
        onClick={clickHandler}
        alt="Connect Wallet"
      />
    </Box>
  );
};

export default ConnectWallet;
