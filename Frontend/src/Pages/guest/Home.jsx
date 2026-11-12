import React from "react";
import Header from "../../Components/common/Header";
import HeroSection from "../../Components/home/HeroSection";
import StatsSection from "../../Components/home/StateSection";
import PlacementPolicy from "../../Components/home/PlacementPolicy";
import Recruiters from "../../Components/home/Recruiters";
import AboutSection from "../../Components/home/AboutSection";
import Footer from "../../Components/common/Footer";

const Home = () => {
  return (
    <>
      <Header/>
      <HeroSection/>
      <StatsSection/>
      <PlacementPolicy/>
      <Recruiters/>
      <AboutSection/>
      <Footer/>
    </>
  );
};

export default Home;