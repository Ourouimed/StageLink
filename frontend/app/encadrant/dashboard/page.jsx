'use client'
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  getProfile, 
  getEntreprises, 
  getStages,
  acceptEntrepriseRequest,
  declineEntrepriseRequest
} from "@/store/features/encadrant/encadrantSlice";
import { Badge } from "@/components/ui/Badge";
import { Building2, ClipboardCheck, GraduationCap, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePopup } from "@/hooks/usePopup";

export default function EncadrantDashboard() {
    const dispatch = useDispatch();
    const { profile, entreprises, stages, isLoading } = useSelector((state) => state.encadrant);
    const { openPopup } = usePopup();

    useEffect(() => {
        dispatch(getProfile());
        dispatch(getEntreprises());
        dispatch(getStages());
    }, [dispatch]);

    // Metrics for the Academic Supervisor
    const stats = useMemo(() => {
        return {
            activeSupervisions: stages?.filter(s => s.status === 'in_progress').length || 0,
            pendingRequests: entreprises?.filter(e => e.status === 'pending').length || 0,
            completedGrading: stages?.filter(s => s.note_pedagogique > 0).length || 0,
            totalPartners: entreprises?.filter(e => e.status === 'accepted').length || 0,
        };
    }, [entreprises, stages]);

    if (isLoading) return <DashboardLayout><p className="p-6 text-center text-gray-500">Chargement de l'espace encadrant...</p></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Welcome Header */}
                <div>
                    <h4 className="text-2xl font-bold text-gray-800">Bonjour, Dr. {profile?.nom}</h4>
                    <p className="text-gray-500 mt-1">Suivi pédagogique et gestion des partenariats entreprises.</p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Stages suivis" value={stats.activeSupervisions} sub="En cours" color="text-indigo-600" icon={GraduationCap} />
                    <StatCard title="Demandes" value={stats.pendingRequests} sub="Partenariats" color="text-orange-600" icon={Clock} />
                    <StatCard title="Notes saisies" value={stats.completedGrading} sub={`sur ${stages.length}`} color="text-green-600" icon={ClipboardCheck} />
                    <StatCard title="Entreprises" value={stats.totalPartners} sub="Collaborations" color="text-blue-600" icon={Building2} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Enterprise Requests (Left Column) */}
                    <section className="xl:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800">Demandes de Partenariat</h3>
                        </div>
                        <div className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
                            {entreprises?.filter(e => e.status === 'pending').map((e) => (
                                <div key={e.id_entreprise} className="p-4 flex flex-col space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-sm text-gray-800">{e.nom_entreprise}</p>
                                            <p className="text-xs text-gray-400">{e.secteur || 'Secteur non défini'}</p>
                                        </div>
                                        <Badge variant="warning">Nouveau</Badge>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="flex-1" onClick={() => dispatch(acceptEntrepriseRequest(e.id_entreprise))}>Accepter</Button>
                                        <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-100" onClick={() => dispatch(declineEntrepriseRequest(e.id_entreprise))}>Refuser</Button>
                                    </div>
                                </div>
                            ))}
                            {stats.pendingRequests === 0 && (
                                <p className="p-6 text-center text-xs text-gray-400 italic">Aucune demande en attente</p>
                            )}
                        </div>
                    </section>

                    {/* Supervision Table (Right Column) */}
                    <section className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800">Étudiants sous votre encadrement</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr className="text-gray-400 uppercase text-[10px] tracking-wider">
                                        <th className="px-4 py-3">Étudiant</th>
                                        <th className="px-4 py-3">Entreprise</th>
                                        <th className="px-4 py-3 text-center">Note Pédag.</th>
                                        <th className="px-4 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {stages?.map((s) => (
                                        <tr key={s.stage_id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4">
                                                <p className="font-bold text-gray-800">{s.etudiant}</p>
                                                <p className="text-xs text-gray-500">{s.titre}</p>
                                            </td>
                                            <td className="px-4 py-4">
                                                <Badge variant="outline" className="text-gray-600">{s.entreprise}</Badge>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <span className={`text-xs font-bold ${s.note_pedagogique > 0 ? 'text-green-600' : 'text-gray-300'}`}>
                                                    {s.note_pedagogique > 0 ? `${s.note_pedagogique}/20` : '-- / 20'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <Button size="sm" outline variant="main" onClick={() => {
                                                    openPopup({
                                                        title: 'Notation Pédagogique',
                                                        component: 'StageInfoPopup', 
                                                        props: { stage: s }
                                                    })
                                                }}>
                                                    {s.note_pedagogique > 0 ? 'Modifier' : 'Noter'}
                                                </Button>
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

function StatCard({ title, value, sub, color, icon: Icon }) {
    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
            <div>
                <span className="text-gray-500 text-xs font-semibold uppercase">{title}</span>
                <p className={`text-2xl font-black my-1 ${color}`}>{value}</p>
                <span className="text-gray-400 text-[10px]">{sub}</span>
            </div>
            <div className={`p-2 rounded-lg bg-gray-50 ${color} opacity-80`}>
                <Icon size={22} />
            </div>
        </div>
    );
}