import { MapPin, Building2 } from 'lucide-react'; 

export const EtudiantStageCard = ({ stage , onClick, isActive}) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div 
             onClick={onClick}
            className={`cursor-pointer border rounded-md py-4 transition-all duration-200 shadow-sm
                ${isActive 
                    ? 'border-main' 
                    : 'border-gray-300 bg-white hover:border-gray-300 hover:shadow-md'
                }`}>
            <div className="px-4 pb-4">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-main">
                        <Building2 size={16} />
                        <h4 className="text-sm font-semibold uppercase tracking-wider">{stage.entreprise.nom_entreprise}</h4>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">
                        Posté le {formatDate(stage.created_at)}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-1">{stage.titre}</h3>
                
                {/* Location */}
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <MapPin size={14} />
                    <p>{stage.ville}</p>
                </div>

                
            </div>

            {/* Badges Footer */}
            <div className="flex items-center gap-2 flex-wrap px-4 pt-4 border-t border-gray-300">
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
    );
};