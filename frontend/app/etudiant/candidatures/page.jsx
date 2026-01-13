'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { usePopup } from "@/hooks/usePopup";
import { getCandidatures } from "@/store/features/etudiant/etudiantSlice";
import { Building, Calendar } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function CandidaturePage (){
    const dispatch = useDispatch()
    const { candidatures } = useSelector(state=> state.etudiant)
    const { openPopup } = usePopup()
    useEffect(()=>{
        dispatch(getCandidatures())
    },[dispatch])
    return <DashboardLayout>
         <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Candidatures</h1>
                    <p className="text-gray-500 mt-1">Consulter votre candidatures.</p>
                </div>
                <div className="text-sm font-medium text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
                    {candidatures?.length || 0} Candidatures totales
                </div>
            </div>




              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Entreprise</th>
                            <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Statut</th>
                            <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Titre de stage</th>
                            <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Date d'envoi</th>
                            <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Date de démarrage</th>
                            <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Ville</th>
                            
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {candidatures && candidatures.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50/80 transition-all">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="cursor-pointer h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold" 
                                            onClick={()=> openPopup({title : 'Entreprise info' , component : 'EntrepriseProfilePopup' , props : {
                                                candidature : c
                                            }})}>
                                            <Building/>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 capitalize">
                                                {c.nom_entreprise}
                                            </p>
                                            <p className="text-xs text-gray-400 font-mono">
                                                ID: {c.entreprise_id?.slice(0, 8)}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge text={c.status}/>
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                    {c.titre}
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                    <div className="flex items-center gap-2">
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

                            </tr>
                        ))}
                    </tbody>
                    </table>
              </div>
    </DashboardLayout>
}