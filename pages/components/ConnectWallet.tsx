import Box from '@mui/material/Box';

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useWalletDialog } from "@solana/wallet-adapter-material-ui";

const ConnectSignImage = "/assets/connect-wallet-wood.png";

const ConnectWallet = () => {
  const { setOpen } = useWalletDialog();
  const wallet = useAnchorWallet();

  const clickHandler = () => !wallet && setOpen(true);

  return (
    <Box
      display="flex" width='100%' height='100vh'
      alignItems="center" justifyContent="center"
    >
      <img src={ConnectSignImage} onClick={clickHandler} alt='Connect Wallet' />
    </Box>
  );
};

export default ConnectWallet;
