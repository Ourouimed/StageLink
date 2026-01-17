'use client'
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getProfile, getCandidatures, getStages } from "@/store/features/etudiant/etudiantSlice";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { BarChart3, CheckCircle, Dock, Download, GraduationCap, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/cards/StatsCard";

export default function EtudiantDashboard() {
    const dispatch = useDispatch();
    const { profile, candidatures, stages, isLoading } = useSelector((state) => state.etudiant);

    useEffect(() => {
        dispatch(getProfile());
        dispatch(getCandidatures());
        dispatch(getStages());
    }, [dispatch]);

    // Advanced Statistics based on the JSON provided
    const stats = useMemo(() => {
        const totalCands = candidatures?.length || 0;
        const accepted = candidatures?.filter(c => c.status === 'accepted').length || 0;
        const finishedStages = stages?.filter(s => s.status === 'finished').length || 0;
        
        // Calculate average grade from finished stages
        const grades = stages?.filter(s => s.status === 'finished').map(s => s.note_final) || [];
        const avgGrade = grades.length > 0 ? (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2) : "N/A";

        return { totalCands, accepted, finishedStages, avgGrade };
    }, [candidatures, stages]);

    if (isLoading) return <DashboardLayout><p className="p-6">Chargement...</p></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="space-y-3">
                {/* Header */}
                <div>
                     <h4 className="text-2xl font-bold text-gray-800">Bonjour {profile?.nom} {" "} {profile?.prenom}</h4>
                      <p className="opacity-90 mt-2">Voici un aperçu de votre progression et de vos stages.</p>
                    

                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Candidatures" value={stats.totalCands} sub="Total envoyé" color="text-blue-600" icon={Send}/>
                    <StatCard title="Acceptées" value={stats.accepted} sub="Prêtes pour convention" color="text-green-600" icon={CheckCircle}/>
                    <StatCard title="Stages Finis" value={stats.finishedStages} sub="Évaluations closes" color="text-purple-600" icon={GraduationCap}/>
                    <StatCard title="Moyenne Générale" value={`${stats.avgGrade}/20`} sub="Note finale" color="text-orange-600" icon={BarChart3}/>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                    {/* Candidatures (Left Column) */}
                    <section className="xl:col-span-1 bg-white py-4 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 border-b border-gray-300 pb-4 px-4">Dernières Candidatures</h3>
                        <div className="space-y-4 px-4 pt-4">
                            {candidatures?.slice(0, 6).map((c) => (
                                <div key={c.id} className="flex flex-col space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-sm text-gray-700 truncate w-40">{c.titre}</span>
                                        <Badge text={c.status} />
                                    </div>
                                    <span className="text-xs text-gray-400">{c.nom_entreprise} • {c.ville}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Stages Details (Right Column) */}
                    <section className="xl:col-span-2 bg-white py-4 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 border-b border-gray-300 px-4 pb-4">Suivi des Stages</h3>
                        <div className="overflow-x-auto px-4 pt-4">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="text-gray-400 uppercase text-[10px] tracking-wider">
                                        <th className="pb-3">Entreprise</th>
                                        <th className="pb-3">Rapport</th>
                                        <th className="pb-3 text-center">Note Final</th>
                                        <th className="pb-3 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {stages?.map((s) => (
                                        <tr key={s.stage_id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-3">
                                                <p className="font-bold text-gray-800">{s.titre}</p>
                                                <p className="text-xs text-gray-500">{s.entreprise}</p>
                                            </td>
                                            <td className="py-3">
                                                {s.rapport_stage ? (
                                                    <Button href={s.rapport_stage} target="_blank" size="sm" outline variant="main">Voir Rapport <Download size={12}/></Button>
                                                ) : (
                                                    <span className="text-gray-400 text-xs italic">Non déposé</span>
                                                )}
                                            </td>
                                            <td className="py-3 text-center font-mono font-bold text-indigo-600">
                                                {s.note_final > 0 ? s.note_final : "--"}/20
                                            </td>
                                            <td className="py-3 text-right">
                                                <Badge text={s.status}/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
}
