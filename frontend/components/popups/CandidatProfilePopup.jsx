import { Calendar, MapPin, GraduationCap, Link as LinkIcon, FileText, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export default function CandidatProfilePopup({ candidat }) {
  if (!candidat) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      {/* Header Section */}
      <div className="border-b border-gray-300 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {candidat.prenom} {candidat.nom}
        </h2>
        <p className="text-lg text-blue-600 font-medium">{candidat.titre}</p>
        <Badge text={candidat.status} variant={candidat.status === 'accepted' ? 'success' : 'error'}/>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-3 text-gray-600">
          <GraduationCap className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">Niveau Scolaire</p>
            <p className="font-medium">{candidat.niveau_scolaire}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">Ville</p>
            <p className="font-medium">{candidat.ville}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">Date de démarrage</p>
            <p className="font-medium">{formatDate(candidat.demarage)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">Postulé le</p>
            <p className="font-medium">{formatDate(candidat.application_sent_at)}</p>
          </div>
        </div>
      </div>

      {/* Actions / Links */}
      <div className="flex flex-wrap justify-end gap-1 pt-4 border-t border-gray-300">
        {candidat.cv && (
          <Button 
            variant='main'
            size='sm'
            href={candidat.cv} 
            target="_blank" 
            rel="noopener noreferrer"
           
          >
            <FileText className="w-4 h-4" /> Voir le CV
          </Button>
        )}

        {candidat.website && (
          <Button 
            outline
            size='sm'
            href={candidat.website.startsWith('http') ? candidat.website : `https://${candidat.website}`}
            target="_blank"
          >
            <Globe className="w-4 h-4" /> Portfolio
          </Button>
        )}

        {candidat.linkedin && (
          <Button size='sm' 
            href={candidat.linkedin}
            target="_blank"
          >
            <LinkIcon className="w-4 h-4" /> LinkedIn
          </Button>
        )}
      </div>
    </div>
  );
}