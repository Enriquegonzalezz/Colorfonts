import { About } from "./components/About";

import { FAQ } from "./components/FAQ";

import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";

import { ScrollToTop } from "./components/ScrollToTop";
import "./App.css";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Home;
