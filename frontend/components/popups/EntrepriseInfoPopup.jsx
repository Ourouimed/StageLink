import React from 'react';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Linkedin, 
  Tag, 
  Briefcase 
} from 'lucide-react';
import { Button } from '../ui/Button';

export default function EntrepriseInfoProfile({ entreprise }) {
  if (!entreprise) return null;

  return (
    <div className="w-full bg-white overflow-hidden">
      {/* Header / Banner Color */}
      <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700" />

      {/* Profile Section */}
      <div>
        {/* Avatar/Logo Placeholder */}
        <div className="relative -mt-12 mb-4">
          <div className="inline-flex items-center justify-center h-24 w-24 bg-white rounded-2xl shadow-lg border-4 border-white text-blue-600">
            <Building2 size={48} />
          </div>
        </div>

        {/* Identity */}
        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {entreprise.nom_entreprise}
          </h2>
          <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Tag size={14} className="text-gray-400" />
              <span>{entreprise.secteur}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-gray-400" />
              <span>{entreprise.ville}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase size={14} className="text-gray-400" />
              <span>{entreprise.type_entreprise}</span>
            </div>
          </div>
        </div>

        <hr className="border-gray-100 mb-6" />

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            À propos
          </h3>
          <p className="text-gray-600 leading-relaxed italic">
            "{entreprise.description}"
          </p>
        </div>

        {/* External Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {entreprise.website && (
            <Button href={entreprise.website } variant='main' target="_blank" outline className='justify-center'>
                <Globe size={18} />
                site web
            </Button>
          )}
          {entreprise.linkedin && (
            <Button href={entreprise.linkedin} target="_blank" className='justify-center !bg-[#0077b5] hover:bg-[#00669c]'>
                <Linkedin size={18} />
                site web
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}