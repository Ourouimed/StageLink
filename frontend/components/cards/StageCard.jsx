import { Calendar, MapPin, Pencil, Timer, Trash2, Building2, Clock } from "lucide-react";
import { Button } from "../ui/Button";
import { usePopup } from "@/hooks/usePopup";

export const StageCard = ({ stage, role }) => {
  const { openPopup } = usePopup();

  const handleOpenEditPopup = () => {
    openPopup({ title: "Modifier l'offre", component: 'EditStagePopup', props: { stage , id : stage.stage_id } });
  };

  const handleOpenDeletePopup = () => {
    openPopup({ title: "Supprimer l'offre", component: 'DeleteStagePopup', props: { id: stage.stage_id, titre: stage.titre } });
  };

  return (
    <div className="group border border-gray-300 rounded-2xl py-4 md:py-6 shadow-sm bg-white hover:shadow-md hover:border-main/20 transition-all duration-300">
      
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 px-4 md:px-6 pb-4 md:pb-6">
        <div className="flex-1">
          {/* Header Info */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <Building2 size={16} className="text-main" />
              <p className="text-sm text-main font-semibold tracking-wide uppercase">{stage.entreprise}</p>
            </div>
            <h3 className="font-bold text-xl md:text-2xl text-gray-800 capitalize leading-tight">
              {stage.titre}
            </h3>
          </div>

          {/* Details Grid - Responsive 1 col on mobile, 2 or more on md */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-slate-400 shrink-0" />
              <span className="font-medium text-slate-700">Ville:</span> 
              <span className="truncate">{stage.ville}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Timer size={16} className="text-slate-400 shrink-0" />
              <span className="font-medium text-slate-700">Durée:</span> 
              <span>{stage.duree_months} mois</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-slate-400 shrink-0" />
              <span className="font-medium text-slate-700">Début:</span> 
              <span>{new Date(stage.demarage).toLocaleDateString('fr-FR')}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} className="text-slate-400 shrink-0" />
              <span className="font-medium text-slate-700">Créé le:</span> 
              <span>{new Date(stage.created_at).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons - Stacked on mobile, row on large screens */}
        {role === 'entreprise' && (
          <div className="flex flex-row lg:flex-col gap-2 pt-4 lg:pt-0 border-t lg:border-none border-gray-100">
            <Button 
              size="sm" 
              outline 
              className="flex-1 lg:flex-none justify-center gap-2"
              onClick={handleOpenEditPopup}
            >
              <Pencil size={16}/>
              <span className="hidden sm:inline">Modifier</span>
            </Button>

            <Button 
              size="sm" 
              variant="error"
              className="flex-1 lg:flex-none justify-center gap-2"
              onClick={handleOpenDeletePopup}
            >
              <Trash2 size={16}/>
              <span className="hidden sm:inline">Supprimer</span>
            </Button>
          </div>
        )}
      </div>

      {/* Footer Badges */}
      <div className=" px-4 md:px-6 pt-4 md:pt-6 border-t border-gray-300 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-[11px] font-bold uppercase tracking-wider">
            {stage.type_stage}
          </span>
          <span className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
            stage.disponibilite === 'Temps plein' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-orange-100 text-orange-700'
          }`}>
            {stage.disponibilite}
          </span>
        </div>
        
        
      </div>
    </div>
  );
};