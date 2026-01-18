'use client'
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  getProfile, 
  getCandidats, 
  getStages, 
  getEncadrants 
} from "@/store/features/entreprise/entrepriseSlice";
import { Badge } from "@/components/ui/Badge";
import { Users, Briefcase, GraduationCap, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { usePopup } from "@/hooks/usePopup";
import { StatCard } from "@/components/cards/StatsCard";

export default function EntrepriseDashboard() {
    const dispatch = useDispatch();
    const { profile, candidats, stages, encadrants, isLoading } = useSelector((state) => state.entreprise);
    const {openPopup} = usePopup()
    useEffect(() => {
        dispatch(getProfile());
        dispatch(getCandidats());
        dispatch(getStages());
        dispatch(getEncadrants());
    }, [dispatch]);

    // Calculate Enterprise-specific metrics
    const stats = useMemo(() => {
        return {
            totalCands: candidats?.length || 0,
            pendingCands: candidats?.filter(c => c.status === 'pending').length || 0,
            activeStages: stages?.filter(s => s.status === 'in_progress').length || 0,
            totalMentors: encadrants?.length || 0,
        };
    }, [candidats, stages, encadrants]);

    if (isLoading) return <DashboardLayout><p className="p-6 text-center text-gray-500">Chargement de l'espace entreprise...</p></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="space-y-3">
                
                <div className="flex justify-between items-end">
                    <div>
                        <h4 className="text-2xl font-bold text-gray-800">Espace {profile?.nom_entreprise || 'Entreprise'}</h4>
                        <p className="text-gray-500 mt-1">Gestion des talents, des encadrants et suivi des stages en cours.</p>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Candidatures" value={stats.totalCands} sub="Toutes les offres" color="text-blue-600" icon={Users} />
                    <StatCard title="À Traiter" value={stats.pendingCands} sub="Nouveaux profils" color="text-orange-600" icon={Star} />
                    <StatCard title="Stages Actifs" value={stats.activeStages} sub="En entreprise" color="text-green-600" icon={Briefcase} />
                    <StatCard title="Encadrants" value={stats.totalMentors} sub="Équipe pédagogique" color="text-purple-600" icon={GraduationCap} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                    
                    <section className="xl:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800">Nouveaux Candidats</h3>
                            <Badge variant="info" text={`${stats.pendingCands} nouveaux`}></Badge>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {candidats?.slice(0, 5).map((c) => (
                                <div key={c.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-sm text-gray-800">{c.nom} {" "} {c.prenom}</p>
                                            <p className="text-xs text-gray-500">{c.titre}</p>
                                        </div>
                                        <Badge text={c.status} variant={c.status === 'accepted' ? 'success' : 'error'}/>
                                    </div>
                                    <div className="mt-2 flex gap-2">
                                        <Link className="text-[10px] font-bold text-blue-600 hover:underline" href={c.cv}>Voir CV</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Active Internship Tracking (Right Column) */}
                    <section className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800">Suivi des Stagiaires</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50">
                                    <tr className="text-gray-400 uppercase text-[10px] tracking-wider">
                                        <th className="px-4 py-3">Stagiaire</th>
                                        <th className="px-4 py-3">Encadrant</th>
                                        <th className="px-4 py-3 text-center">Progression</th>
                                        <th className="px-4 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {stages?.map((s) => (
                                        <tr key={s.stage_id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4">
                                                <p className="font-bold text-gray-800">{s.etudiant}</p>
                                                <p className="text-xs text-gray-500 truncate max-w-[150px]">{s.titre}</p>
                                            </td>
                                            <td className="px-4 py-4 text-gray-600">
                                                {s.encadrant || <span className="text-red-400 italic">Non assigné</span>}
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                                                    Note: {s.note_final > 0 ? `${s.note_final}/20` : 'En attente'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <Button size="sm" outline onClick={()=>{
                                                        openPopup({title : 'Edit stage' , component : 'StageInfoPopup' , props : {
                                                            stage : s
                                                        }})
                                                }}>Evaluer</Button>
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

