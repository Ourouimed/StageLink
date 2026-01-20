'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { usePopup } from "@/hooks/usePopup";
import { getCandidats, getEncadrants } from "@/store/features/entreprise/entrepriseSlice";
import { Calendar } from "lucide-react";
import { useEffect, useMemo } from "react"; // Added useMemo
import { useDispatch, useSelector } from "react-redux";

export default function CandidatsPage() {
    const dispatch = useDispatch();
    const { candidats, isLoading, encadrants } = useSelector(state => state.entreprise);
    const { openPopup } = usePopup();

    
    const acceptedEncadrants = useMemo(() => {
        return encadrants ? encadrants.filter(e => e.status === 'accepted') : [];
    }, [encadrants]);

    useEffect(() => {
        dispatch(getCandidats());
        dispatch(getEncadrants());
    }, [dispatch]);

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-8 flex-wrap">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Candidats</h1>
                    <p className="text-gray-500 mt-1">Gérez les demandes de stage pour vos offres.</p>
                </div>
                <div className="text-sm font-medium text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
                    {candidats?.length || 0} Candidatures totales
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">ID Étudiant</th>
                                    <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Statut</th>
                                    <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Titre de stage</th>
                                    <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Date d'envoi</th>
                                    <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Date de démarrage</th>
                                    <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Ville</th>
                                    <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider text-right">Décision</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {candidats && candidats.map((c) => (
                                    <tr key={c.id} className="hover:bg-gray-50/80 transition-all">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="cursor-pointer h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold" 
                                                    onClick={()=> openPopup({title : 'Candidat info' , component : 'CandidatProfilePopup' , props : {
                                                        candidat : c
                                                    }})}>
                                                    {c.prenom[0]}{c.nom[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 capitalize">
                                                        {c.prenom} {c.nom}
                                                    </p>
                                                    <p className="text-xs text-gray-400 font-mono">
                                                        ID: {c.etudiant_id?.slice(0, 8)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge text={c.status} variant={c.status === 'accepted' ? 'success' : c.status === 'declined' ? 'error' : 'warning'}/>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            {c.titre}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            <div className="flex items-center gap-2 ">
                                                <Calendar size={14} />
                                                {new Date(c.application_sent_at).toLocaleDateString('fr-FR')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} />
                                                {new Date(c.demarage).toLocaleDateString('fr-FR')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">
                                            {c.ville}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 flex-wrap">
                                                {c.status === 'pending' ? (
                                                    <>
                                                        <Button 
                                                            size="sm" 
                                                            variant="error" 
                                                            outline
                                                            onClick={() => openPopup({
                                                                title: 'Refuser la candidature', 
                                                                component: 'DeclineCandidaturePopup', 
                                                                props: { id: c.id }
                                                            })}
                                                        >
                                                            Refuser
                                                        </Button>
                                                        <Button
                                                            size="sm" 
                                                            variant="success"
                                                            onClick={() => openPopup({
                                                                title: 'Accepter la candidature', 
                                                                component: 'AcceptCandidaturePopup', 
                                                                props: { 
                                                                    id: c.id, encadrants: acceptedEncadrants 
                                                                }
                                                            })}
                                                        >
                                                            Accepter
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-400 text-sm italic py-2">
                                                        Déjà traité
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                {(!candidats || candidats.length === 0) && (
                    <div className="py-20 text-center">
                        <p className="text-gray-400">Aucune candidature pour le moment.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}