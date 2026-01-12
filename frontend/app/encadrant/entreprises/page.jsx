'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useToast } from "@/hooks/useToast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Building2, Calendar, Check, X, externalLink } from "lucide-react";
import { acceptEntrepriseRequest, declineEntrepriseRequest, getEntreprises } from "@/store/features/encadrant/encadrantSlice";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function Demandeentreprises() {
    const dispatch = useDispatch();
    const toast = useToast();
    const { entreprises , isLoading} = useSelector(state => state.encadrant);

    useEffect(() => {
        dispatch(getEntreprises());
    }, [dispatch]);

   
    const handleAccept = async (id)=>{
        try {
            await dispatch(acceptEntrepriseRequest(id)).unwrap()
            toast.success('Demande acceptee avec success')
        }
        catch (err){
            toast.error(err)
        }
    }

    const handleDecline = async (id)=>{
        try {
            await dispatch(declineEntrepriseRequest(id)).unwrap()
            toast.success('Demande refusee')
        }
        catch (err){
            toast.error(err)
        }
    }

    return (
        <DashboardLayout>
            <div>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Demandes des entreprises</h1>
                    <p className="text-gray-500 mt-1">Validez ou refusez les demandes d'adhésion à la plateforme.</p>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500 tracking-wider">Entreprise</th>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500 tracking-wider">Date de demande</th>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500 tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-xs uppercase font-bold text-gray-500 tracking-wider text-right">Décision</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {entreprises && entreprises.map((ent) => (
                                <tr key={ent.id_entreprise} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                                                <Building2 size={24} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 capitalize">
                                                    {ent.nom_entreprise}
                                                </p>
                                                <p className="text-xs text-gray-400 font-mono">
                                                    ID: {ent.id_entreprise.slice(0, 8)}...
                                                </p>
                                            </div>
                                           
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-400" />
                                            {new Date(ent.joined_at).toLocaleDateString('fr-FR', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge text={ent.status}/>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-1">
                                            {ent.status === 'pending' ? (
                                                <>
                                                    <Button
                                                        onClick={() => handleDecline(ent.id_entreprise)}
                                                        size="sm"
                                                        outline
                                                        variant="error"
                                                    >
                                                        Refuser
                                                        <X size={18} />
                                                    </Button>
                                                    <Button 
                                                        onClick={() => handleAccept(ent.id_entreprise)}
                                                        size="sm"
                                                        variant="success"
                                                    >
                                                        <Check size={18} />
                                                        Accepter
                                                    </Button>
                                                </>
                                            ) : (
                                                <span className="text-gray-300 text-sm italic">Traitée</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {(!entreprises || entreprises.length === 0) && !isLoading && (
                        <div className="flex flex-col items-center justify-center py-20 bg-gray-50/30">
                            <Building2 size={48} className="text-gray-200 mb-4" />
                            <p className="text-gray-500 font-medium">Aucune demande en attente.</p>
                        </div>
                    )}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="p-10 text-center text-blue-600 font-medium animate-pulse">
                            Chargement des demandes...
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}