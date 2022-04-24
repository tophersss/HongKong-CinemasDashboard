import { useRef } from "react";
import { Container, Paper, Typography, Grid } from "@mui/material";
import HeroSection from "../components/HomeHeroSection";
import Pulse from "../components/styles/Pulse";
import aNeon from "../assets/animated-neon.png";
import HomeIntro from "../components/HomeIntro";
import ViewSalesOverHours from "../components/ViewSalesOverHours";
import ViewTemporarySalesOverHours from "../components/ViewTemporarySalesOverHours";

const Home = () => {
  const contentRef = useRef(null);

  // const executeScroll = () => contentRef.scrollIntoView();
  const executeScroll = () => {
    contentRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <HeroSection scrollToContent={executeScroll} />
      <HomeIntro contentRef={contentRef} />
      <ViewTemporarySalesOverHours></ViewTemporarySalesOverHours>
      <ViewSalesOverHours></ViewSalesOverHours>
    </>
  );
};

export default Home;
