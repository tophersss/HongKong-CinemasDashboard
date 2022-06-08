import { createTheme } from "@mui/material";

const fonts = "'Varela', Arial, 'sans-serif'";

export const DarkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#313e87",
    },
    secondary: {
      main: "#e558fb",
    },
    background: {
      paper: "#F9FAFC",
    },
    // text: {
    //   primary: "#000000",
    //   secondary: "rgba(255,255,255,0.91)",
    // },
  },
  typography: {
    fontFamily: fonts,
  },
  "& .MuiGrid-item": {
    paddingTop: "100px",
  },
});
