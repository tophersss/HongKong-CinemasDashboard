import { useState, forwardRef } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { ThemeProvider } from "@mui/material/styles";
import { MuiTheme } from "./styles/MuiTheme";

import GitHubIcon from '@mui/icons-material/GitHub';


function App() {
  // note: not in use
  const [tabValue, setTabValue] = useState("/dashboard");

  const handleChange = (event, val) => {
    console.log(`Tabs handling change:`);
    console.log(val);
    setTabValue(val);
  };

  // const LinkBehavior = forwardRef((props, ref) => (
  //   <Link ref={ref} to="/dashboard" {...props} role={undefined} />
  // ));

  return (
    <ThemeProvider theme={MuiTheme}>
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
            label="About"
            value="/about"
            to="/about"
            component={Link}
            sx={{ color: "navy" }}
          />
          <Tab
            label="Dashboard"
            value="/dashboard"
            to="/dashboard"
            component={Link}
            sx={{ color: "navy" }}
          />
          <button onClick={()=>{
              setTabValue("/dashboard");
              console.log(`button clicked to change tab`)
              }}> To Dashboard</button>
          <GitHubIcon>
            <a onClick={()=>setTabValue("/dashboard")}>
            </a>
          </GitHubIcon>
        </Tabs>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
