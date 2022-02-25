import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
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
    <Box sx={{ height: "100%", m: 6 }}>
      <Typography
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundImage: "url(/assets/blank-bar.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          m: 4,
        }}
        gutterBottom
        color="#02f077"
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
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "rgb(0, 0, 0, 0.0)",
                }}
              >
                <CardHeader
                  title={name}
                  sx={{
                    width: "100%",
                    height: "60%",
                    backgroundImage: "url(/assets/blank-bar.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 90%",
                    alignSelf: "start",
                  }}
                >
                  <Typography
                    sx={{
                      paddingBottom: 1.5,
                    }}
                    color="#02f077"
                    variant="h5"
                  >
                    Remaining: {remaining}
                  </Typography>
                </CardHeader>
                <CardMedia component="img" image={image} alt="random" />
                <CardContent sx={{ flexGrow: 1, m: -2 }}>
                  <Box>
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
                        Remaining: {remaining}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
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
                  </Box>
                  <GetOne wallet={wallet58} />
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}
