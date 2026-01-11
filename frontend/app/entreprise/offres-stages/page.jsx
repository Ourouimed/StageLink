'use client'
import { StageCard } from "@/components/cards/StageCard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { usePopup } from "@/hooks/usePopup";
import { getAllByEntreprise } from "@/store/features/offre-stage/offreStageSlice";
import { Calendar, Plus, Users } from "lucide-react"; // Added Users icon
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OffresDeStages() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { stages, isLoading: stageLoading } = useSelector(state => state.stage);

    useEffect(() => {
        dispatch(getAllByEntreprise());
    }, [dispatch]);

    const { openPopup } = usePopup();

    // Calculate total candidatures across all stages
    const totalCandidatures = stages.reduce((acc, stage) => acc + (stage.nombre_candidatures || 0), 0);

    return (
        <DashboardLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h4 className="text-2xl font-bold text-gray-900">
                        Offres de stages
                    </h4>
                    {stages.length > 0 && (
                        <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                            <Users size={14} /> {totalCandidatures} candidatures reçues au total
                        </p>
                    )}
                </div>
                
                <Button 
                    variant="main" 
                    size='sm' 
                    className="w-full sm:w-auto shadow-sm"
                    onClick={() => openPopup({ title: 'Ajouter une offre', component: 'AjouterOffreStage' })}
                >
                    <Plus size={18} /> Ajouter une offre
                </Button>
            </div>

            {stages.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl mt-6 p-6 md:p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                        <Calendar className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">
                        Aucune offre publiée
                    </h3>
                    <p className="text-slate-500 max-w-xs mt-2 mb-6">
                        Vous n'avez pas encore créé d'offres de stage. Commencez par en ajouter une pour attirer des candidats.
                    </p>
                    <Button 
                        variant="main" 
                        onClick={() => openPopup({ title: 'Ajouter une offre', component: 'AjouterOffreStage' })}
                        size="lg"
                    >
                        <Plus size={18} /> Créer ma première offre
                    </Button>
                </div>
            ) : (
                <div className="space-y-4 mt-8">
                    {stages.map((s) => (
                        <StageCard key={s.stage_id} stage={s} role={user?.role} />
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}