"use client";

import { verifySession } from "@/store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { getProfile as getEntrepriseProfile } from "@/store/features/entreprise/entrepriseSlice";
import { getProfile as getEtudiantProfile } from "@/store/features/etudiant/etudiantSlice";
import { getProfile as getEncadrantProfile } from "@/store/features/encadrant/encadrantSlice";

import { Menu, X } from "lucide-react"; 

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { isLoading, isInitialized, user } = useSelector(state => state.auth);
  const { profile: entrepriseProfile } = useSelector(state => state.entreprise);
  const { profile: etudiantProfile } = useSelector(state => state.etudiant);
  const { profile: encadrantProfile } = useSelector(state => state.encadrant);

  /* ───────────────────────────
     Verify session
  ─────────────────────────── */
  useEffect(() => {
    if (!isInitialized) {
      dispatch(verifySession());
    }
  }, [dispatch, isInitialized]);

  /* ───────────────────────────
     Load profile based on role
  ─────────────────────────── */
  useEffect(() => {
    if (!user) return;

    if (user.role === "entreprise") {
      dispatch(getEntrepriseProfile());
    } else if (user.role === "etudiant") {
      dispatch(getEtudiantProfile());
    } else if (user.role === "encadrant") {
      dispatch(getEncadrantProfile());
    }
  }, [dispatch, user]);


  useEffect(() => {
    if (isInitialized && !isLoading && !user) {
      router.replace("/login");
    }
  }, [isInitialized, isLoading, user, router]);

  
  useEffect(() => {
    if (!user) return;

    const roleBasePath = `/${user.role}/dashboard`;

    if (!pathname.startsWith(roleBasePath)) {
      router.replace(roleBasePath);
    }
  }, [user, pathname, router]);

 
  if (!isInitialized || isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="animate-pulse">Loading...</span>
      </div>
    );
  }

  if (!user) return null;

  const profile =
    user.role === "entreprise"
      ? entrepriseProfile
      : user.role === "encadrant"
      ? encadrantProfile
      : etudiantProfile;

  /* ───────────────────────────
     Layout
  ─────────────────────────── */
  return (
    <section className="min-h-screen bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-50">
        <h2 className="font-bold text-main">Dashboard</h2>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-gray-100 rounded-md"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] md:gap-6 md:px-10">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-[60] w-72 bg-white
            transform transition-transform duration-300
            md:relative md:translate-x-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="md:hidden flex justify-end p-4">
            <button onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <Sidebar
            user={{ ...profile, role: user.role }}
            onNavigate={() => setIsSidebarOpen(false)}
          />
        </aside>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-[55] md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main */}
        <main className="py-6 px-4 md:px-0">
          {children}
        </main>
      </div>
    </section>
  );
}
