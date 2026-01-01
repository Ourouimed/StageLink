'use client'
import Header from "@/components/sections/Header"
import Hero from "@/components/sections/Hero"
import { verifyEmail } from "@/store/features/auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

function EmailVerificationHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const id = searchParams.get('verify-email');

  useEffect(() => {
    if (id) {
      console.log("Dispatching email verification for ID:", id);
      dispatch(verifyEmail(id));

      
      router.replace("/");
    }
  }, [id, dispatch, router]);

  return null; 
}

export default function Home(){
  return <>
    <Suspense fallback={null}>
        <EmailVerificationHandler />
    </Suspense>
    <Header/>
    <Hero/>
  </>
}