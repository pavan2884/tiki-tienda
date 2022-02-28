import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getData } from "../accounts/tokenAccounts";
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

type Data = {
  items: any[];
};

const WrappedNftList = React.forwardRef(function NftList(
  { walletB58 }: Props,
  _ref
) {
  const [data, setData] = useState<Data>({ items: [] });
  useEffect(() => {
    getData(walletB58).then((data) => {
      setData(data);
    });
    return () => {};
  }, [walletB58]);

  const { items } = data;
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
