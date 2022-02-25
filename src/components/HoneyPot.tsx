import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import useSWR from "swr";
import GetOne from "./GetOne";

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
  const { data, isLoading, isError } = useHoneyPot();
  if (!data) {
    if (isLoading) {
      return <div>Loading Honeypot....</div>;
    } else if (isError) {
      return <div>Error</div>;
    }
  } else {
    const { wallet, cost } = data.data;
    return (
      <Box sx={{ height: "100%", p: 14 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              width: "100%",
              height: "80%",
              backgroundImage: "url(/assets/blank-bar.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 80%",
              alignSelf: "start",
            }}
          >
            <Typography
              sx={{
                paddingBottom: 1.5,
                paddingLeft: 1,
              }}
              color="#02f077"
              variant="h5"
              align="left"
            >
              Turnt Up Honeypot
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: "url(/assets/featured-cost.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              marginTop: -2,
            }}
          >
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: 2,
                paddingBottom: 1,
                paddingLeft: 1,
              }}
              color="#02f077"
              variant="h5"
              align="left"
            >
              Cost: {cost}
            </Typography>
          </Box>
          <GetOne wallet={wallet} />
        </Stack>
      </Box>
    );
  }
  return <div />;
}
