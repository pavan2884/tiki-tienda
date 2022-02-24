import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import useSWR from "swr";
import GetOne from "./GetOne";

type Offer = {
  wallet58: string;
  name: string;
  remaining: string;
  cost: number;
  image: string;
};

type Data = {
  offers: Offer[];
};

const fetcher = (url: string) => axios.get<Data>(url).then((res) => res.data);

function useOffers() {
  const { data, error } = useSWR(`/api/offers`, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function Offers() {
  const { data } = useOffers();
  console.log("offers", data);
  return (
    <Box sx={{ height: "100%", m: 4 }}>
      <Typography
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundImage: "url(/assets/featured-offers-title.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          m: 4,
        }}
        gutterBottom
        color="#79D277"
        variant="h3"
        component="h2"
        align="center"
      >
        FEATURED OFFERS
      </Typography>
      <Grid container spacing={4}>
        {data?.offers.map(
          ({ wallet58, name, remaining, cost, image }: Offer, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader title={name} />
                <CardMedia component="img" image={image} alt="random" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography>Remaining: {remaining}</Typography>
                  <Typography>Cost: {cost}</Typography>
                </CardContent>
                <CardActions>
                  <GetOne wallet={wallet58} />
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}
