import { Box, Modal, Stack, Typography } from "@mui/material";
import { PublicKey } from "@solana/web3.js";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import { nftCount } from "../accounts";
import GetOne from "./GetOne";
import NftList from "./NftList";

const fetcher = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    if (!data) {
      return { error: new Error() };
    }
    return { data };
  } catch (err) {
    console.log(err);
  }
};

function useHoneyPot() {
  const { data, error } = useSWR(`/api/honeypot`, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function HoneyPot() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useHoneyPot();

  if (!data) {
    if (isLoading) {
      return <div>Loading Treasure Chest....</div>;
    } else if (isError) {
      return <div>Error</div>;
    }
    return <div />;
  } else {
    const { wallet: walletB58, cost } = data.data;
    const displayHoneyPot = async () => {
      const totalLeft = await nftCount(new PublicKey(walletB58));
      if (totalLeft > 0) {
        setOpen(true);
      }
    };
    const handleClose = () => setOpen(false);
    return (
      <Box sx={{ height: "100%", paddingLeft: 6, marginTop: -3 }}>
        <Stack spacing={0.5}>
          <Box>
            <Box
              sx={{
                width: 330,
                height: "100%",
                backgroundImage: "url(/assets/honeypot-title.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                alignSelf: "start",
                cursor: "default",
              }}
              onClick={displayHoneyPot}
            >
              <Typography
                sx={{
                  fontSize: 25,
                  paddingTop: 1.5,
                  paddingBottom: 2.5,
                  paddingLeft: 2,
                  paddingRight: 7,
                  marginBottom: -3.5,
                }}
                color="#ffffff"
                align="left"
              >
                Turnt Up Treasure CheSt
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: 420,
              height: "100%",
              backgroundImage: "url(/assets/honeypot-cost.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              display: "flex",
              align: "left",
              overflow: "visible",
            }}
          >
            <Typography
              sx={{
                fontSize: 45,
                paddingTop: 5,
                paddingBottom: 1.5,
                paddingLeft: 3,
              }}
              color="#00fff1"
              alignSelf="left"
            >
              CoSt:
            </Typography>
            <Typography
              sx={{
                fontSize: 45,
                paddingTop: 5,
                paddingLeft: 7,
              }}
            >
              {cost}
            </Typography>
          </Box>
          <Box sx={{ width: 330, paddingBottom: 2 }}>
            <GetOne walletB58={walletB58} cost={cost} />
          </Box>
        </Stack>
        <Modal open={open} onClose={handleClose}>
          <NftList walletB58={walletB58} />
        </Modal>
      </Box>
    );
  }
}
