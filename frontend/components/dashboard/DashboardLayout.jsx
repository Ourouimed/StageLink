"use client";

import { verifySession } from "@/store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile as getEntrepriseProfile } from "@/store/features/entreprise/entrepriseSlice";
import { getProfile as getEtudiantProfile } from "@/store/features/etudiant/etudiantSlice";
import { getProfile as getEncadrantProfile } from "@/store/features/encadrant/encadrantSlice";
import { Menu, X } from "lucide-react"; 

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  
  // State to manage mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { isLoading, isInitialized, user } = useSelector(state => state.auth);
  const { profile: entrepriseProfile } = useSelector(state => state.entreprise);
  const { profile: etudiantProfile } = useSelector(state => state.etudiant);
  const { profile: encadrantProfile } = useSelector(state => state.encadrant);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(verifySession());
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    if (!user) return;

    if (user.role === "entreprise") {
      dispatch(getEntrepriseProfile());
    } else if (user.role === "etudiant") {
      dispatch(getEtudiantProfile());
    }
    else if (user.role === "encadrant") {
      console.log('HICHDC')
      dispatch(getEncadrantProfile());
    }
  }, [dispatch, user]);

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

  const profile = user.role === "entreprise" ? entrepriseProfile : user.role === 'encadrant' ? encadrantProfile : etudiantProfile;

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Mobile Top Bar - Visible only on small screens */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-300 sticky top-0 z-50">
        <h2 className="font-bold text-main">Dashboard</h2>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-gray-100 rounded-md text-gray-700"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-0 md:gap-6 px-0 md:px-10">
        {/* Sidebar Wrapper */}
        <aside className={`
          fixed inset-y-0 left-0 z-[60] w-72 transform transition-transform duration-300 ease-in-out bg-white
          md:relative md:translate-x-0 md:w-full md:block
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          {/* Close button inside sidebar (mobile only) */}
          <div className="md:hidden flex justify-end p-4">
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500">
              <X size={24} />
            </button>
          </div>
          
          <Sidebar user={{ ...profile, role: user.role }} onNavigate={() => setIsSidebarOpen(false)} />
        </aside>

        {/* Overlay for mobile backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-[55] md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="py-6 px-4 md:px-0">
          {children}
        </main>
      </div>
    </section>
  );
}