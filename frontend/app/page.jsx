'use client';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifySession } from "@/store/features/auth/authSlice";

import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Companies from "@/components/sections/Companies";
import HowItWorks from "@/components/sections/HowItWorks";
import LatestOffers from "@/components/sections/LatestOffers";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifySession());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Companies />
      <HowItWorks />
      <LatestOffers />
      <Footer />
    </main>
  );
}
