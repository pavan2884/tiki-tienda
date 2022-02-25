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
          m: 1,
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
            fontSize: "1.5vw",
            alignItems: "center",
          }}
          component="h5"
          color="black"
        >
          Welcome to the Turnt Up Tienda!
        </Typography>
        <Typography
          sx={{
            display: "flex",
            fontSize: "1.5vw",
            alignItems: "center",
            fontFamily: "Sans Serif",
          }}
          color="black"
        >
          Use the Tiki Tix you earned from the Turnt Up Gaming Suite to make
          purchases here.
        </Typography>
        <Typography
          sx={{
            display: "flex",
            flexDirection: "column",
            fontSize: "1.5vw",
            alignItems: "center",
            fontFamily: "Sans Serif",
          }}
          color="black"
        >
          Be sure to check back often, as we have amazing offers that don't last
          long!
        </Typography>
      </Box>
    </Box>
  );
}
