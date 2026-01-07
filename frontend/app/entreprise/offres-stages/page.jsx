'use client'
import { StageCard } from "@/components/cards/StageCard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { usePopup } from "@/hooks/usePopup";
import { getAllStage } from "@/store/features/offre-stage/offreStageSlice";
import { Calendar, Plus } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function OffresDeStages (){
    const dispatch = useDispatch()
    const {stages , isLoading : stageLoading } =  useSelector(state => state.stage)

    useEffect(()=>{
        dispatch(getAllStage())
    } , [dispatch])


    const { openPopup } = usePopup()
    return <>
        <DashboardLayout>
            <div className="flex justify-between items-center">
                <h4 className="text-2xl font-semibold">
                    Offres de stages
                </h4>
                <Button variant="main" size='sm' onClick={()=> openPopup({title : 'Ajouter une offre' , component : 'AjouterOffreStage'})}>
                    Ajouter une offre <Plus/>
                </Button>
            </div>

            
               {stages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl mt-6 p-12 text-center">
                
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
                    onClick={() => openPopup({title: 'Ajouter une offre', component: 'AjouterOffreStage'})}
                    size="lg"
                >
                    <Plus size={18}/> Créer ma première offre
                </Button>
            </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {stages.map((s) => (
                    <StageCard key={s.titre} stage={s} />
                    ))}
                </div>
                )}
            
        </DashboardLayout>
    </>
}