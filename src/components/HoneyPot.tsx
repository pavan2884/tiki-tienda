import { Box, Button, Stack } from "@mui/material";
import axios from "axios";
import useSWR from "swr";
import GetOne from "./GetOne";

type Data = {
  wallet: string;
  price: number;
};

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
      return <div>Loading....</div>;
    } else if (isError) {
      return <div>Error</div>;
    }
  } else {
    console.log(data.data);
    const { wallet, price } = data.data;
    return (
      <Box sx={{ height: "100%", p: 14 }}>
        <Stack spacing={2}>
          <Button variant="contained">Turnt Up Honeypot</Button>
          <Button variant="contained">Cost: {price}</Button>
          <GetOne wallet={wallet} />
        </Stack>
      </Box>
    );
  }
}
