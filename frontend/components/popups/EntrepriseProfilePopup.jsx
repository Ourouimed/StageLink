'use client'
import { Calendar, MapPin, Briefcase, Link as LinkIcon, FileText, Globe } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export default function EntrepriseProfilePopup({ candidature }) {
  if (!candidature) return null;

  // Helper to format dates safely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="p-1">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {candidature.nom_entreprise}
            </h2>
            <p className="text-lg text-blue-600 font-medium">{candidature.titre}</p>
          </div>
          <Badge text={candidature.status} />
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-3 text-gray-600">
          <Briefcase className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">Secteur / Type</p>
            <p className="font-medium">{candidature.secteur} — {candidature.type_entreprise}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">Ville</p>
            <p className="font-medium">{candidature.ville}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">Date de démarrage</p>
            <p className="font-medium">{formatDate(candidature.demarage)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400">Postulé le</p>
            <p className="font-medium">{formatDate(candidature.application_sent_at)}</p>
          </div>
        </div>
      </div>

      {/* Actions / Links */}
      <div className="flex flex-wrap justify-end gap-1 pt-6 border-t border-gray-200">

        {candidature.website && (
          <Button
            outline
            size='sm'
            href={candidature.website.startsWith('http') ? candidature.website : `https://${candidature.website}`}
            target="_blank"
          >
            <Globe className="w-4 h-4 mr-2" /> Site Web
          </Button>
        )}

        {candidature.linkedin && (
          <Button 
            variant="outline"
            size='sm' 
            href={candidature.linkedin}
            target="_blank"
          >
            <LinkIcon className="w-4 h-4 mr-2" /> LinkedIn
          </Button>
        )}
      </div>
    </div>
  );
}