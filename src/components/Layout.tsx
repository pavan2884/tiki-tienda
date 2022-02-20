import Box from "@mui/material/Box";

import InfoSign from "./InfoSign";
import Offers from "./Offers";
import Hut from "./Hut";
import Gold from "./Gold";
import HoneyPot from "./HoneyPot";

// For testing, disable for production
// const border = "2px dashed green";
const border = "";

export default function Layout() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gap: 1,
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "auto",
        gridTemplateAreas: `"banner banner offers offers offers"
                              "banner banner offers offers offers"
                              "hut . offers offers offers"
                              "hut gold gold honeypot honeypot"
                              "hut gold gold honeypot honeypot"`,
      }}
    >
      <Box sx={{ gridArea: "banner", border }}>
        <InfoSign />
      </Box>
      <Box sx={{ gridArea: "offers", border }}>
        <Offers />
      </Box>
      <Box sx={{ gridArea: "hut", border }}>
        <Hut />
      </Box>
      <Box sx={{ gridArea: "gold", border }}>
        <Gold />
      </Box>
      <Box sx={{ gridArea: "honeypot", border }}>
        <HoneyPot />
      </Box>
    </Box>
  );
}
