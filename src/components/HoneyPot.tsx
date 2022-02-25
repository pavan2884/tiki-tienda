import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import useSWR from "swr";
import GetOne from "./GetOne";
import { nftCount } from "../accounts";

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
    const { wallet, cost } = data.data;

    const displayHoneyPot = async () => {
      const totalLeft = await nftCount(wallet);
      if (totalLeft > 0) {
        //TODO !!! implement preview of honeypot similar to village
      } else {
        setOpen(true);
      }
    };
    return (
      <Box sx={{ height: "100%", paddingLeft: 6, marginTop: -11 }}>
        <Stack spacing={0.5}>
          <Box>
            <Box
              sx={{
                width: 300,
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
                  paddingTop: 1,
                  paddingBottom: 2,
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
              width: 380,
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
          <Box sx={{ width: 280, paddingBottom: 2 }}>
            <GetOne wallet={wallet} />
          </Box>
        </Stack>
      </Box>
    );
  }
}
