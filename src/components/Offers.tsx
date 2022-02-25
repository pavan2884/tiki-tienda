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
  //data: Data
  const { data } = useOffers();
  //console.log("offers", data);
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
          marginTop: 6,
          marginLeft: "9vw",
          marginRight: "9vw",
          paddingBottom: 1,
          fontFamily: "Tiki Tropic",
        }}
        gutterBottom
        color="#02f077"
        variant="h3"
        component="h3"
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
                    width: "77%",
                    height: "60%",
                    backgroundImage: "url(/assets/blank-bar.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    alignSelf: "center",
                    textOverflow: "ellipse",
                    paddingTop: 0.7,
                    paddingBottom: 1,
                    marginBottom: -0.4,
                  }}
                ></CardHeader>
                <Box sx={{ paddingInline: 7 }}>
                  <CardMedia
                    sx={{
                      borderLeftStyle: "solid",
                      borderRightStyle: "solid",
                      borderColor: "#1f2022",
                      backgroundColor: "#00000080",
                      p: 2,
                    }}
                    component="img"
                    image={image}
                    alt="random"
                  />
                </Box>
                <CardContent
                  sx={{
                    display: "grid",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 0,
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: "url(/assets/blank-bar.png)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%",
                        display: "flex",
                        paddingLeft: 1.5,
                        paddingTop: 0.5,
                        paddingBottom: 1,
                      }}
                    >
                      <Typography color="#00fff1" variant="h4">
                        Remaining:
                      </Typography>
                      {parseInt(remaining) === 0 ? (
                        <Typography
                          sx={{
                            paddingLeft: 1,
                          }}
                          color="#dd0000"
                          variant="h4"
                        >
                          {remaining}
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            paddingLeft: 1,
                          }}
                          variant="h4"
                        >
                          {remaining}
                        </Typography>
                      )}
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
                        marginBottom: 0.5,
                        paddingTop: 1.1,
                        paddingBottom: 1.3,
                        paddingLeft: 1.5,
                        overflow: "visible",
                      }}
                    >
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "column",
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
                          paddingLeft: 1,
                        }}
                        variant="h4"
                      >
                        {cost}
                      </Typography>
                    </Box>
                  </Box>
                  {remaining ? (
                    <GetOne wallet={wallet58} />
                  ) : (
                    <GetOne wallet={"false"} />
                  )}
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}
