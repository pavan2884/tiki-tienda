import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import ConnectWallet from "../components/ConnectWallet";
import Layout from "../components/Layout";

const ContainerWrapper = styled(Container)`
  background-image: url(/assets/background.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: #ffaf70;
  height: 56.25vw;
`;

const Home: NextPage = () => {
  const wallet = useAnchorWallet();

  return (
    <ContainerWrapper maxWidth={false} disableGutters>
      {!wallet ? <ConnectWallet /> : <Layout />}
    </ContainerWrapper>
  );
};

export default Home;
