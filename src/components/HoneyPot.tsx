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
    return <div />;
  } else {
    const { wallet, cost } = data.data;
    return (
      <Box sx={{ height: "100%" }}>
        <Stack spacing={0.5}>
          <Box
            sx={{
              width: 280,
              height: "100%",
              backgroundImage: "url(/assets/honeypot-title.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              alignSelf: "start",
              marginBottom: -1.5,
            }}
          >
            <Typography
              sx={{
                paddingTop: 0.5,
                paddingBottom: 1,
                paddingLeft: 1,
              }}
              color="#02f077"
              variant="h4"
              align="left"
            >
              Turnt Up Honeypot
            </Typography>
          </Box>
          <Box
            sx={{
              width: 330,
              height: "75%",
              backgroundImage: "url(/assets/featured-cost.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              display: "flex",
              alignSelf: "left",
              overflow: "visible",
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
              color="#00fff1"
              variant="h4"
              align="left"
            >
              CoSt:
            </Typography>
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: 2,
                paddingBottom: 1,
                paddingLeft: 1,
              }}
              variant="h4"
              align="left"
            >
              {cost}
            </Typography>
          </Box>
          <Box sx={{ width: 280 }}>
            <GetOne wallet={wallet} />
          </Box>
        </Stack>
      </Box>
    );
  }
}
