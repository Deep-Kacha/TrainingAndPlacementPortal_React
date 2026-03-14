import React from "react";
import Header from "../../components/common/Header";
import HeroSection from "../../components/home/HeroSection";
import StatsSection from "../../components/home/StateSection";
import PlacementPolicy from "../../components/home/PlacementPolicy";
import Recruiters from "../../components/home/Recruiters";
import AboutSection from "../../components/home/AboutSection";
import Footer from "../../components/common/Footer";

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