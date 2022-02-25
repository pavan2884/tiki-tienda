import { Box, Button, Stack } from "@mui/material";
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
          <Button variant="contained">Turnt Up Honeypot</Button>
          <Button variant="contained">Cost: {cost}</Button>
          <GetOne wallet={wallet} />
        </Stack>
      </Box>
    );
  }
  return <div />;
}
