import { Grid, Paper } from "@mui/material";
import { PublicKey } from "@solana/web3.js";
import React from "react";

import { getNftAccounts } from "../accounts";
import TikiItem from "./Tiki";

const Style = {
  position: "absolute",
  width: "80%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
  overflowY: "auto",
  outline: "none",
  maxHeight: "90vh",
};

type Props = {
  walletB58: string;
};

const getNftItems = (nfts: any[]) => {
  return nfts.map((nft) => {
    return {
      name: "name1",
      image: "image1",
    };
  });
};

const WrappedNftList = React.forwardRef(function NftList(
  { walletB58 }: Props,
  ref
) {
  const nfts: any[] = [];
  // await getNftAccounts(walletPk);
  const items = getNftItems(nfts);
  return (
    <Paper sx={Style}>
      <Grid container spacing={2}>
        {items.map((tiki, index) => (
          <Grid item xs={12} md={6} lg={6} xl={4} key={index}>
            <TikiItem tiki={tiki} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
});

export default WrappedNftList;
