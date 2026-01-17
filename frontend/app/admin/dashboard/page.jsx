'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useSelector } from "react-redux";

export default function AdminDashboard (){
    const { user } = useSelector(state => state.auth)
    return <DashboardLayout>
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                    <div>
                        <h4 className="text-2xl font-bold text-gray-800">Welcome {user?.nom} {" "} {user?.prenom}</h4>
                        <p className="text-gray-500 mt-1">Gerer les utilisateur de l'application</p>
                    </div>
            </div>
        </div>
    </DashboardLayout>
}