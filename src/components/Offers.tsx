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
    <Box sx={{ height: "100%", m: "2vw" }}>
      <Typography
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundImage: "url(/assets/blank-bar.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          m: 4,
          paddingBottom: 1,
          fontFamily: "Tiki Tropic",
        }}
        gutterBottom
        color="#02f077"
        variant="h3"
        component="h2"
        align="center"
      >
        FEATURED OFFERS
      </Typography>
      <Grid container spacing={0}>
        {data?.offers.map(
          ({ wallet58, name, remaining, cost, image }: Offer, index) => (
            <Grid item key={index} sm={10} md={6} lg={4}>
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
                    width: "90%",
                    height: "60%",
                    backgroundImage: "url(/assets/blank-bar.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 90%",
                    alignSelf: "center",
                    textOverflow: "clip",
                    paddingTop: 0.7,
                    paddingBottom: 2,
                    marginBottom: -1.1,
                  }}
                ></CardHeader>
                <Box sx={{ paddingInline: "3vw" }}>
                  <CardMedia
                    sx={{
                      borderLeftStyle: "solid",
                      borderRightStyle: "solid",
                      borderColor: "#1f2022",
                    }}
                    component="img"
                    image={image}
                    alt="random"
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 2, paddingTop: 0 }}>
                  <Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "80%",
                        backgroundImage: "url(/assets/blank-bar.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 80%",
                        display: "flex",
                        alignSelf: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          paddingBottom: 1.5,
                          paddingLeft: 1,
                        }}
                        color="#00fff1"
                        variant="h4"
                      >
                        Remaining:
                      </Typography>
                      <Typography
                        sx={{
                          paddingBottom: 1.5,
                          paddingLeft: 1,
                        }}
                        color="#ffffff"
                        variant="h4"
                      >
                        {remaining}
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
                        display: "flex",
                        alignSelf: "left",
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
                        color="#00fff1"
                        variant="h4"
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
                        color="#ffffff"
                        variant="h4"
                      >
                        {cost}
                      </Typography>
                    </Box>
                  </Box>
                  {remaining ? <GetOne wallet={wallet58} /> : <Box />}
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}
