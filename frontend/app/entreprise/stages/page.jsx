'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getStages } from "@/store/features/entreprise/entrepriseSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Award, User, Edit } from "lucide-react"; // Assuming you use lucide-react
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { usePopup } from "@/hooks/usePopup";

export default function StageList() {
    const { stages } = useSelector(state => state.entreprise);
    const dispatch = useDispatch();
    const { openPopup } = usePopup()
    useEffect(() => {
        dispatch(getStages());
    }, [dispatch]);

    return (
        <DashboardLayout>
            <div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Gestion des Stages</h1>
                    <p className="text-gray-500">Suivi des stages en cours et évaluations</p>
                </div>

                {/* Styled Table Container */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">ID Stage</th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Note evaluation </th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Note pedagogique </th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider">Note final </th>
                                <th className="px-6 py-4 text-xs uppercase font-semibold text-gray-600 tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stages && stages.map((s) => (
                                <tr key={s.stage_id} className="hover:bg-gray-50/80 transition-all">
                                    {/* ID Column with Avatar-style icon */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                                                <Award size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-mono text-gray-400">
                                                    #{s.stage_id.slice(0, 8)}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status Column */}
                                    <td className="px-6 py-4">
                                        <Badge text={s.status}/>
                                    </td>

                                    {/* Notes Column */}
                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                        <span className="flex items-center gap-1">
                                                <span className="font-semibold text-gray-900">{(s.note_evaluation || 0).toFixed(2)}</span>
                                                <span className="text-xs text-gray-400">/ 20</span>
                                        </span>
                                    </td>


                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                        <span className="flex items-center gap-1">
                                                <span className="font-semibold text-gray-900">{(s.note_pedagogique || 0).toFixed(2)}</span>
                                                <span className="text-xs text-gray-400">/ 20</span>
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                        <span className="flex items-center gap-1">
                                                <span className="font-semibold text-gray-900">{(s.note_final || 0).toFixed(2)}</span>
                                                <span className="text-xs text-gray-400">/ 20</span>
                                        </span>
                                    </td>


                                    {/* Actions Column */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="main"
                                                    size="sm" outline 
                                                    onClick ={ ()=>{
                                                        openPopup({title : 'Edit stage' , component : 'StageInfoPopup' , props : {
                                                            stage : s
                                                        }})
                                                    }}>
                                                Modifier
                                                <Edit/>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {(!stages || stages.length === 0) && (
                        <div className="py-20 text-center">
                            <p className="text-gray-400">Aucun stage trouvé.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}