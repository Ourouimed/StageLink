"use client"; // تأكد من وجود هذه الإضافة في Next.js App Router

import { verifySession } from "@/store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isLoading: authLoading, isInitialized, user } = useSelector(state => state.auth);

   
    useEffect(() => {
        if (!isInitialized) {
            dispatch(verifySession());
        }
    }, [dispatch, isInitialized]);





    useEffect(() => {
        if (isInitialized && !authLoading && !user) {
            router.replace('/login');
        }
    }, [user, isInitialized, authLoading, router]);

   
    if (!isInitialized || authLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <span className="animate-pulse">Loading...</span> 
            </div>
        );
    }

    if (!user) return null;

    return (
        <section className="min-h-screen bg-gray-50"> 
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 px-4 md:px-10">
                <aside className="">
                    <Sidebar user={user} />
                </aside>
                <main className="py-6">
                    {children}
                </main>
            </div>
        </section>
    );
}