'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { usePopup } from "@/hooks/usePopup";
import { getCandidatures } from "@/store/features/etudiant/etudiantSlice";
import { Building, Calendar, MapPin } from "lucide-react"; // Added MapPin for better UI
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CandidaturePage() {
    const dispatch = useDispatch()
    const { candidatures } = useSelector(state => state.etudiant)
    const { openPopup } = usePopup()

    useEffect(() => {
        dispatch(getCandidatures())
    }, [dispatch])

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Candidatures</h1>
                    <p className="text-gray-500 mt-1 text-sm md:text-base">Consulter vos candidatures envoyées.</p>
                </div>
                <div className="text-sm font-medium text-gray-500 bg-gray-100 px-4 py-2 rounded-lg whitespace-nowrap">
                    {candidatures?.length || 0} Candidatures totales
                </div>
            </div>

        
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]"> 
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-4 md:px-6 text-xs uppercase font-semibold text-gray-600 tracking-wider">Entreprise</th>
                                <th className="px-4 py-4 md:px-6 text-xs uppercase font-semibold text-gray-600 tracking-wider">Statut</th>
                                <th className="px-4 py-4 md:px-6 text-xs uppercase font-semibold text-gray-600 tracking-wider">Titre de stage</th>
                                <th className="px-4 py-4 md:px-6 text-xs uppercase font-semibold text-gray-600 tracking-wider">Date d'envoi</th>
                                <th className="px-4 py-4 md:px-6 text-xs uppercase font-semibold text-gray-600 tracking-wider">Démarrage</th>
                                <th className="px-4 py-4 md:px-6 text-xs uppercase font-semibold text-gray-600 tracking-wider">Ville</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {candidatures && candidatures.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50/80 transition-all">
                                    <td className="px-4 py-4 md:px-6">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="cursor-pointer h-10 w-10 shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold" 
                                                onClick={() => openPopup({
                                                    title: 'Entreprise info', 
                                                    component: 'EntrepriseProfilePopup', 
                                                    props: { candidature: c }
                                                })}
                                            >
                                                <Building size={20}/>
                                            </div>
                                            <div className="min-w-0"> {/* Prevents text from pushing layout */}
                                                <p className="text-sm font-semibold text-gray-900 capitalize truncate max-w-[150px]">
                                                    {c.nom_entreprise}
                                                </p>
                                                <p className="text-xs text-gray-400 font-mono">
                                                    ID: {c.entreprise_id?.slice(0, 8)}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 md:px-6">
                                        <Badge text={c.status} variant={c.status === 'accepted' ? 'success' : c.status === 'declined' ? 'error' : 'warning'}/>
                                    </td>
                                    <td className="px-4 py-4 md:px-6 text-gray-600 text-sm italic">
                                        {c.titre}
                                    </td>
                                    <td className="px-4 py-4 md:px-6 text-gray-600 text-sm whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-400" />
                                            {new Date(c.application_sent_at).toLocaleDateString('fr-FR')}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 md:px-6 text-gray-600 text-sm whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-400" />
                                            {new Date(c.demarage).toLocaleDateString('fr-FR')}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 md:px-6 text-gray-600 text-sm">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={14} className="text-gray-400" />
                                            {c.ville}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Empty State (Optional but recommended) */}
                {(!candidatures || candidatures.length === 0) && (
                    <div className="p-8 text-center text-gray-500">
                        Aucune candidature trouvée.
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}