import { Box, Typography } from "@mui/material";

export default function InfoSign() {
  return (
    <Box
      sx={{
        height: "100%",
        marginLeft: "3.4vw",
        marginTop: "3.5vw",
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          height: "100%",
          paddingLeft: "3.5vw",
          paddingRight: "2.8vw",
          paddingTop: "4.1vw",
          backgroundImage: "url(/assets/info-sign.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            flexDirection: "column",
            fontSize: "2vw",
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
            fontSize: "1.3vw",
            alignItems: "center",
            fontFamily: "Sans Serif",
            marginLeft: "1vw",
            marginRight: "1vw",
            marginTop: ".4vw",
            marginBottom: "0vw",
          }}
          color="black"
        >
          Use currency from Turnt Up Tikis to make purchases here.
        </Typography>
        <Typography
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "1vw",
            marginRight: "1vw",
            fontSize: "1.3vw",
            alignItems: "center",
            fontFamily: "Sans Serif",
          }}
          color="black"
        >
          {
            "Be sure to check back often, as we have amazing offers that don't last long!"
          }
        </Typography>
      </Box>
    </Box>
  );
}
