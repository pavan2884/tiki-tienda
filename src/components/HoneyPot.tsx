import { Box, Stack, Button } from "@mui/material";
import GetOne from "./GetOne";

export default function HoneyPot() {
  return (
    <Box sx={{ height: "100%", p: 14 }}>
      <Stack spacing={2}>
        <Button variant="contained">Turnt Up Honeypot</Button>
        <Button variant="contained">Cost: 15</Button>
        <GetOne />
      </Stack>
    </Box>
  );
}
