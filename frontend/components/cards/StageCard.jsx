import { Calendar, MapPin, Timer } from "lucide-react"

export const StageCard = ({stage})=>{
    console.log(stage)
    return (
        <div className="border border-gray-300 rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition-shadow">
     
      <div className="mb-4">
        <h3 className="font-semibold text-2xl capitalize">{stage.titre}</h3>
        <p className="text-sm text-main font-medium">{stage.entreprise}</p>
      </div>

   
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <div className="flex items-center gap-1">
          <span className="font-semibold flex items-center gap-1"> <MapPin size={14}/> Ville:</span> {stage.ville}
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold flex items-center gap-1"><Calendar size={14}/> Début:</span> {new Date(stage.demarage).toDateString('fr-FR')}
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold flex items-center gap-1"><Timer size={14}/> Durée:</span> {stage.duree_months} mois
        </div>

        <div className="flex items-center gap-1">
          <span className="font-semibold flex items-center gap-1"><Calendar size={14}/> Creer en:</span> {new Date(stage.created_at).toDateString('fr-FR')}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-300 flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold">
          {stage.type_stage}
        </span>
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          stage.disponibilite === 'Temps plein' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
        }`}>
          {stage.disponibilite}
        </span>
      </div>
    </div>
    )
}