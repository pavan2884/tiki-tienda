import { Box, Typography } from "@mui/material";

export default function InfoSign() {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Box
        sx={{
          height: "100%",
          m: 4,
          p: 10,
          backgroundImage: "url(/assets/info-sign.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      >
        <Typography variant="h6" color="black">
          Welcome to the Turnt Up Tienda!
        </Typography>
      </Box>
    </Box>
  );
}
