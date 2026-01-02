'use client'

import Header from "@/components/sections/Header";
import { verifySession } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EtudiantDashboard() {
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

  return (
    <>
      <Header isSticky />
    </>
  );
}
