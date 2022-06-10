import { useState, forwardRef } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { ThemeProvider } from "@mui/material/styles";
import { DarkTheme } from "./components/styles/DarkTheme";


function App() {
  // note: not in use
  const [tabValue, setTabValue] = useState("/dashboard");

  const handleChange = (event, val) => {
    setTabValue(val);
  };

  const LinkBehavior = forwardRef((props, ref) => (
    <Link ref={ref} to="/dashboard" {...props} role={undefined} />
  ));

  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline />
      <div className="App">
        <Tabs
          value={useLocation().pathname}
          onChange={handleChange}
          centered={true}
          sx={{
            backgroundColour: "black",
          }}
        >
          <Tab
            label="Dashboard"
            value="/dashboard"
            to="/dashboard"
            component={Link}
            sx={{ color: "navy" }}
          />
        </Tabs>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
