'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { usePopup } from "@/hooks/usePopup";
import { getEncadrants } from "@/store/features/entreprise/entrepriseSlice";
import { Plus, Mail, Calendar, MoreVertical, UserCheck } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ListEncadrants() {
    const { openPopup } = usePopup();
    const { encadrants } = useSelector(state => state.entreprise);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEncadrants());
    }, [dispatch]);

    return (
        <DashboardLayout>
           
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Encadrants</h1>
                        <p className="text-gray-500 mt-1">Gérez les encadrants de votre entreprise.</p>
                    </div>
                    <Button variant="main" size="sm" onClick={() => {
                        openPopup({ title: 'Ajouter un encadrant', component: 'AddEncadrantPopup' })
                    }}>
                        Ajouter encadrant <Plus size={14} className="ml-2" />
                    </Button>
                </div>

                {/* Table / List Section */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Nom & Prénom</th>
                                    <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Statut</th>
                                    <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Rejoint le</th>
                                    <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {encadrants && encadrants.map((encadrant) => (
                                    <tr key={encadrant.id_encadrant} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                                    {encadrant.prenom[0]}{encadrant.nom[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 capitalize">
                                                        {encadrant.prenom} {encadrant.nom}
                                                    </p>
                                                    <p className="text-xs text-gray-400 font-mono">
                                                        ID: {encadrant.id_encadrant.slice(0, 8)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge text={encadrant.status} variant={encadrant.status === 'accepted' ? 'success' : encadrant.status === 'declined' ? 'error' : 'warning'}/>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-sm text-gray-500 gap-2">
                                                <Calendar size={14} />
                                                {new Date(encadrant.joined_at).toLocaleDateString('fr-FR')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end">
                                                <Button 
                                                    variant="error"
                                                    outline
                                                    size="sm">
                                                    annuler demande
                                                </Button>
                                            </div>
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {(!encadrants || encadrants.length === 0) && (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                            <UserCheck size={48} className="text-gray-200 mb-4" />
                            <p>Aucun encadrant trouvé.</p>
                        </div>
                    )}
                </div>
            
        </DashboardLayout>
    );
}