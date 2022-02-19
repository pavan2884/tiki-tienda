import Box from "@mui/material/Box";

import InfoSign from "./InfoSign";
import Offers from "./Offers";
import Hut from "./Hut";
import Gold from "./Gold";
import HoneyPot from "./HoneyPot";

export default function Layout() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gap: 1,
        gridTemplateRows: "auto",
        gridTemplateAreas: `"banner banner offers offers offers"
                              "banner banner offers offers offers"
                              "hut . offers offers offers"
                              "hut gold gold honeypot honeypot"
                              "hut gold gold honeypot honeypot"`,
      }}
    >
      <Box sx={{ gridArea: "banner" }}><InfoSign /></Box>
      <Box sx={{ gridArea: "offers" }}><Offers /></Box>
      <Box sx={{ gridArea: "hut" }}><Hut /></Box>
      <Box sx={{ gridArea: "gold" }}><Gold /></Box>
      <Box sx={{ gridArea: "honeypot" }}><HoneyPot /></Box>
    </Box>
  );
}
