import { createTheme } from "@mui/material";

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
      paper: "#FAFAD2",
    },
    text: {
      primary: "#000000",
      secondary: "rgba(255,255,255,0.91)",
    },
  },
  "& .MuiGrid-item": {
    paddingTop: "100px",
  },
});
