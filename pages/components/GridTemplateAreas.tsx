import Box from "@mui/material/Box";

export default function GridTemplateAreas() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        color: "#fff",
        "& > .MuiBox-root > .MuiBox-root": {
          p: 1,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          gridTemplateRows: "auto",
          gridTemplateAreas: `"banner banner offers offers offers"
                              "banner banner offers offers offers"
                              "hut . offers offers offers"
                              "hut gold gold honeypot honeypot"
                              "hut gold gold honeypot honeypot"`,
        }}
      >
        <Box sx={{ gridArea: "banner", bgcolor: "primary.dark" }}>banner</Box>
        <Box sx={{ gridArea: "offers", bgcolor: "secondary.main" }}>offers</Box>
        <Box sx={{ gridArea: "hut", bgcolor: "warning.main" }}>Hut</Box>
        <Box sx={{ gridArea: "gold", bgcolor: "secondary.main" }}>Gold</Box>
        <Box sx={{ gridArea: "honeypot", bgcolor: "warning.dark" }}>Honepot</Box>
      </Box>
    </Box>
  );
}

        // <Box sx={{ gridArea: "main", bgcolor: "secondary.main" }}>Main</Box>
        // <Box sx={{ gridArea: "sidebar", bgcolor: "error.main" }}>Sidebar</Box>
