'use client'
import { StatCard } from "@/components/cards/StatsCard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { getUsers } from "@/store/features/admin/adminSlice";
import { getAllStages } from "@/store/features/offre-stage/offreStageSlice";
import { Briefcase, Building2, GraduationCap, Users, MapPin, Calendar, Eye } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminDashboard() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { users } = useSelector(state => state.admin);
    const { stages } = useSelector(state => state.stage);

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getAllStages());
    }, [dispatch]);

    const stats = useMemo(() => {
        const totalEtudiants = users?.filter(u => u.role === 'etudiant').length || 0;
        const totalEntreprises = users?.filter(u => u.role === 'entreprise').length || 0;
        const totalEncadrants = users?.filter(u => u.role === 'encadrant').length || 0;
        const totalStages = stages?.length || 0;

        return { totalEtudiants, totalEntreprises, totalEncadrants, totalStages };
    }, [users, stages]);

    return (
        <DashboardLayout>
            <div className="space-y-4">
              
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h4 className="text-3xl font-bold text-gray-900 capitalize">
                            Bienvenue, {user?.nom} {user?.prenom}
                        </h4>
                        <p className="text-gray-500 mt-1">Gérez les utilisateurs et les offres de stage de l'application.</p>
                    </div>
                </div>

               
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Étudiants" value={stats.totalEtudiants} sub="total étudiants" color="text-blue-600" icon={Users} />
                    <StatCard title="Entreprises" value={stats.totalEntreprises} sub="total entreprises" color="text-green-600" icon={Building2} />
                    <StatCard title="Encadrants" value={stats.totalEncadrants} sub="total encadrants" color="text-red-600" icon={GraduationCap} />
                    <StatCard title="Stages" value={stats.totalStages} sub="offres publiées" color="text-purple-600" icon={Briefcase} />
                </div>

               
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-900">Dernières Offres de Stage</h3>
                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                            Voir tout
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Offre & Spécialité</th>
                                    <th className="px-6 py-4">Entreprise</th>
                                    <th className="px-6 py-4">Détails</th>
                                    <th className="px-6 py-4">Candidatures</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {stages && stages.map((stage) => (
                                    <tr key={stage.stage_id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                                                    {stage.titre}
                                                </span>
                                                <span className="text-xs text-gray-400 font-medium">
                                                    {stage.specialite}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-gray-700">
                                                        {stage.entreprise?.nom_entreprise}
                                                    </span>
                                                    <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-tight">
                                                        {stage.entreprise?.secteur}
                                                    </span>
                                                </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-xs text-gray-500 gap-1.5">
                                                    <MapPin size={12} className="text-gray-400" /> {stage.ville}
                                                </div>
                                                <div className="flex items-center text-xs text-gray-500 gap-1.5">
                                                    <Calendar size={12} className="text-gray-400" /> {stage.duree_months} mois
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge text={`${stage.nombre_candidatures || 0} postulants`} variant="info"/>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Voir détails">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}