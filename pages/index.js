// The Landing Page is the entry point of the application. 
// It introduces users to FinWise and encourages them to sign up.

import Link from "next/link";
import Navbar from "@/components/Dashboard/Navbar";
import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";



export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Hero />
      <Footer />
    </>
  );
}
