"use client";

import { verifySession } from "@/store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfile as getEntrepriseProfile } from "@/store/features/entreprise/entrepriseSlice";
import { getProfile as getEtudiantProfile } from "@/store/features/etudiant/etudiantSlice";

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, isInitialized, user } = useSelector(state => state.auth);
  const { profile: entrepriseProfile } = useSelector(state => state.entreprise);
  const { profile: etudiantProfile } = useSelector(state => state.etudiant);

  //  Vérifier la session
  useEffect(() => {
    if (!isInitialized) {
      dispatch(verifySession());
    }
  }, [dispatch, isInitialized]);

  // Charger le profil selon le rôle
  useEffect(() => {
    if (!user) return;

    if (user.role === "entreprise") {
      dispatch(getEntrepriseProfile());
    } else if (user.role === "etudiant") {
      dispatch(getEtudiantProfile());
    }
  }, [dispatch, user]);

  //
  useEffect(() => {
    if (isInitialized && !isLoading && !user) {
      router.replace("/login");
    }
  }, [isInitialized, isLoading, user, router]);

  if (!isInitialized || isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="animate-pulse">Loading...</span>
      </div>
    );
  }

  if (!user) return null;

  const profile =
    user.role === "entreprise" ? entrepriseProfile : etudiantProfile;

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 px-4 md:px-10">
        <aside>
          <Sidebar user={{ ...profile, role: user.role }} />
        </aside>
        <main className="py-6">{children}</main>
      </div>
    </section>
  );
}
