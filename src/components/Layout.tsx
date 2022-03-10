import Box from "@mui/material/Box";

import InfoSign from "./InfoSign";
import Offers from "./Offers";
//import Hut from "./Hut";
//import Gold from "./Gold";
import HoneyPot from "./HoneyPot";
import Mint from "./Mint";
import { styled } from "@mui/material/styles";

const border =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development"
    ? "2px dashed green"
    : "";

const Base = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    gridTemplateAreas: `"banner banner offers offers offers"
                              "hut hut offers offers offers"
                              "honeypot honeypot offers offers offers"
                              ". . offers offers offers"
                              ". . offers offers offers"`,
  },
  [theme.breakpoints.between("md", "lg")]: {
    gridTemplateAreas: `"banner banner offers offers offers"
                              " hut hut offers offers offers"
                              "honeypot honeypot offers offers offers"
                              "honeypot honeypot offers offers offers"`,
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateAreas: `"banner banner offers offers offers"
                              "banner banner offers offers offers"
                              "hut hut offers offers offers"
                              ". . . . . "
                              ". . .  honeypot mint"
                              ". . . honeypot mint"`,
  },
}));

export default function Layout() {
  return (
    <Base
      sx={{
        height: "100%",
        display: "grid",
        gap: 1,
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "auto",
      }}
    >
      <Box sx={{ gridArea: "banner", height: "25vw", border }}>
        <InfoSign />
      </Box>
      <Box sx={{ gridArea: "offers", border }}>
        <Offers />
      </Box>
      {/*<Box sx={{ gridArea: "hut", border }}>
        <Hut />
      </Box>
      <Box sx={{ gridArea: "gold", border }}>
        <Gold />
      </Box>  */}
      <Box sx={{ gridArea: "honeypot", border }}>
        <HoneyPot />
      </Box>
      <Box sx={{ gridArea: "mint", border }}>
        <Mint />
      </Box>
    </Base>
  );
}
