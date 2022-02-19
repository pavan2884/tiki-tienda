import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import NftList from "./components/archive/NftList";
import SendLamport from "./components/archive/SendLamport";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Turnt Up Tienda
        </Typography>
        <SendLamport />
        <NftList cards={cards} />
      </Box>
    </Container>
  );
};

export default Home;
