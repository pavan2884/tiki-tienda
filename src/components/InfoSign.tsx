import { Box, Typography } from "@mui/material";

export default function InfoSign() {
  return (
    <Box
      sx={{
        height: "100%",
        m: 2,
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          height: "100%",
          m: 2,
          p: "4vw",
          backgroundImage: "url(/assets/info-sign.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          variant="h5"
          component="h4"
          color="black"
        >
          Welcome to the Turnt Up Tienda!
        </Typography>
      </Box>
    </Box>
  );
}
