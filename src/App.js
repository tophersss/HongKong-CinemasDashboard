import { forwardRef, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { DarkTheme } from "./components/styles/DarkTheme";

const clickTest = () => {
  console.log("Button Clicked");
};

const DonutLink = () => <Link to="/donut" />;

const LinkBehavior = forwardRef((props, ref) => (
  <Link ref={ref} to="/donut" {...props} role={undefined} />
));

function App() {
  const [tabValue, setTabValue] = useState("/donut");

  const handleChange = (event, val) => {
    setTabValue(val);
  };

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
            label="Map"
            value="/map"
            to="/map"
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
