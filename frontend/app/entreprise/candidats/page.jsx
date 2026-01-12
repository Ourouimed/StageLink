'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { getCandidats } from "@/store/features/entreprise/entrepriseSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CandidatsPage() {
    const dispatch = useDispatch();
    const { candidats, isLoading } = useSelector(state => state.entreprise);

    useEffect(() => {
        dispatch(getCandidats());
    }, [dispatch]); // Fixed: Only runs on mount

    const handleAccept = (id) => {
        if (confirm("Voulez-vous accepter cette candidature ?")) {
            console.log("Accepted candidate:", id);
            // Example: dispatch(updateCandidatStatus({ id, status: 'accepted' }));
        }
    };

    const handleDecline = (id) => {
        if (confirm("Voulez-vous refuser cette candidature ?")) {
            console.log("Declined candidate:", id);
            // Example: dispatch(updateCandidatStatus({ id, status: 'declined' }));
        }
    };

    return (
        <DashboardLayout>
         
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Candidats</h1>
                        <p className="text-gray-500 mt-1">Gérez les demandes de stage pour vos offres.</p>
                    </div>
                    <div className="text-sm font-medium text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
                        {candidats?.length || 0} Candidatures totales
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-200">
                                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold text-gray-600">ID Étudiant</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold text-gray-600">Statut</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold text-gray-600">Date d'envoi</th>
                                <th className="px-6 py-4 text-xs uppercase tracking-wider font-semibold text-gray-600 text-right">Décision</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {candidats && candidats.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50/80 transition-all">
                                    <td className="px-6 py-4">
                                        <div className="font-mono text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit">
                                            {c.etudiant_id.split('-')[0]}...
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize ${
                                            c.status === 'pending' 
                                            ? 'bg-orange-100 text-orange-700' 
                                            : 'bg-green-100 text-green-700'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'pending' ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                        {new Date(c.application_sent_at).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'long'
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-1">
                                            {c.status === 'pending' ? (
                                                <>
                                                    <Button size="sm" variant="error" outline
                                                        onClick={() => handleDecline(c.id)}
                                                    >
                                                        Refuser
                                                    </Button>
                                                    <Button
                                                        size="sm" 
                                                        variant="success"
                                                        onClick={() => handleAccept(c.id)}
                                
                                                    >
                                                        Accepter
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button className="text-gray-400 text-sm font-medium italic cursor-not-allowed">
                                                    Déjà traité
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {(!candidats || candidats.length === 0) && (
                        <div className="py-20 text-center">
                            <p className="text-gray-400">Aucune candidature pour le moment.</p>
                        </div>
                    )}
                </div>
        </DashboardLayout>
    );
}