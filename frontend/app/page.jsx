'use client';
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import { verifySession } from "@/store/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Home() {
  const dispatch = useDispatch();
  const {isLoading: authLoading, isInitialized } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(verifySession());
  }, [dispatch]);

  if (authLoading || !isInitialized) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Header />
      <Hero />
    </>
  );
}
