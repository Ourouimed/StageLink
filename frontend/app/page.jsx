'use client'
import Header from "@/components/sections/Header"
import Hero from "@/components/sections/Hero"
import { verifyEmail, verifySession } from "@/store/features/auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoading: authLoading , isInitialized } = useSelector(state => state.auth);

  useEffect(() => {
      dispatch(verifySession());
    }, [dispatch]);
  
    useEffect(() => {
      if (!isInitialized ) return;
  
      if (!user) {
        router.push('/login');
        return;
      }
  
      if (user.role !== 'etudiant') {
        router.push(`/${user.role}`);
      }
    }, [user, authLoading, router]);
  
    if (!isInitialized || authLoading) {
      return (
        <div className="w-full h-screen flex items-center justify-center text-xl font-semibold">
          Loading session...
        </div>
      );
    }
  return <>
    <Suspense fallback={null}>
        <EmailVerificationHandler />
    </Suspense>
    <Header/>
    <Hero/>
  </>
}