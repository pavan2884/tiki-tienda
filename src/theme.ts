import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1900, // Changed from 1536
    },
  },
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: '"Beach Hits", Tiki Tropic, Raleway, Arial',
  },
  shape: {
    borderRadius: 3,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: "Beach Hits";
          src: local("Beach Hits"),
          url(./fonts/Beach-Hits.ttf) format("truetype");
        }
        @font-face {
          font-family: "Tiki Tropic";
          src: local("Tiki Tropic"),
          url(./fonts/Tiki-Tropic.ttf) format("truetype");
        }
        body {
          background-color: #ffb272
        }
      `,
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(0, 0, 0, 0.9)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: "Arial",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: "23px",
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
