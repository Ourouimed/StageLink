'use client'

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textares";
import { useToast } from "@/hooks/useToast";
import { getProfile, updateProfile } from "@/store/features/etudiant/etudiantSlice";
import { moroccoCities } from "@/utils/cities";
import { formatDate } from '../../../utils/formateDate'
import {
  Pen,
  Upload,
  Users,
  Globe,
  Linkedin,
  MapPin
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NIVEAUX = ['Bac', 'Bac+1', 'Bac+2', 'Bac+3', 'Bac+5', 'Bac+8'];

export default function ProfileEtudiants() {
  const { profile, isLoading : isProfileLoading } = useSelector(state => state.etudiant);
  const dispatch = useDispatch();
  const toast = useToast();

  const [profileForm, setProfileForm] = useState({
    nom: "",
    prenom: "",
    niveau_scolaire: "",
    date_naissance: "",
    ville: "",
    website: "",
    linkedin: "",
    bio: ""
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        nom: profile.nom || "",
        prenom: profile.prenom || "",
        niveau_scolaire: profile.niveau_scolaire || "",
        date_naissance: formatDate(profile.date_naissance) || "",
        ville: profile.ville || "",
        website: profile.website || "",
        linkedin: profile.linkedin || "",
        bio: profile.bio || ""
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setProfileForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleVilleChange = (value) => {
    setProfileForm(prev => ({ ...prev, ville: value }));
  };

  const handleNiveauChange = (value) => {
    setProfileForm(prev => ({ ...prev, niveau_scolaire: value }));
  };

  const validateForm = () => {
    const errors = {};

    if (!profileForm.nom.trim()) errors.nom = "Nom obligatoire";
    if (!profileForm.prenom.trim()) errors.prenom = "Prénom obligatoire";
    if (!profileForm.date_naissance) errors.date_naissance = "Date obligatoire";
    if (!profileForm.ville) errors.ville = "Ville obligatoire";
    if (!profileForm.bio.trim()) errors.bio = "Bio obligatoire";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateProfile = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(updateProfile(profileForm)).unwrap();
      toast.success("Profil mis à jour avec succès");
    } catch (err) {
      toast.error(err);
    }
  };

  const villeOptions = moroccoCities.map(v => ({ value: v, label: v }));
  const niveauOptions = NIVEAUX.map(n => ({ value: n, label: n }));

  return (
    <DashboardLayout>
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-2xl font-bold text-gray-800">
            Mon profil étudiant
          </h4>
          <Button
            variant="main"
            size="sm"
            onClick={handleUpdateProfile}
            disabled={isProfileLoading}
          >
            Enregistrer <Pen size={16} />
          </Button>
        </div>

        <div className="grid gap-8">
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative group">
                                <div className="w-32 h-32 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                                    <Users size={40} className="text-gray-400" />
                                </div>
                                <button className="absolute -bottom-2 -right-2 p-2 bg-main text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                                    <Upload size={16} />
                                </button>
                            </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <div>
                  <label className="text-sm font-medium">Nom <span className="text-red-500">*</span></label>
                  <Input id="nom" value={profileForm.nom} onChange={handleChange} />
                  {validationErrors.nom && <p className="text-red-500 text-xs">{validationErrors.nom}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium">Prénom <span className="text-red-500">*</span></label>
                  <Input id="prenom" value={profileForm.prenom} onChange={handleChange} />
                  {validationErrors.prenom && <p className="text-red-500 text-xs">{validationErrors.prenom}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium">Date de naissance <span className="text-red-500">*</span></label>
                  <Input
                    id="date_naissance"
                    type="date"
                    value={profileForm.date_naissance}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Niveau scolaire <span className="text-red-500">*</span></label>
                  <Select
                    options={niveauOptions}
                    value={profileForm.niveau_scolaire}
                    onChange={handleNiveauChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <label className="text-sm font-medium flex items-center gap-2">
                            Bio <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                            maxLength={500}
                            id='bio'
                            rows="4" 
                            placeholder="Parlez-nous de votre mission, vision..."
                            value={profileForm.bio}
                            onChange={handleChange}
                        ></Textarea>
                        <div className="flex justify-between items-center mt-2">
                            

                            {validationErrors.bio && (
                                <p className="text-xs text-red-500">{validationErrors.bio}</p>
                            )}

                            <span className={`text-sm text-gray-400 ${profileForm.bio.length === 500 && 'text-red-500'}`}>
                                {profileForm.bio.length}/500
                            </span>
                        </div>
                        
                    </div>

         {/* Section 3: Liens & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Liens */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                            <h5 className="font-semibold flex items-center gap-2 border-b border-gray-300 px-6 py-4">
                                <Globe size={18} /> Présence en ligne
                            </h5>
                            <div className="space-y-3 p-6">
                                <div className="relative">
                                    <Input id='website' icon={Globe} type="url" placeholder="Site web"  value={profileForm.website} onChange={handleChange}/>
                                  
                                </div>
                                <div className="relative">
                                    <Input id='linkedin' icon={Linkedin} type="url" placeholder="Site web"  value={profileForm.linkedin} onChange={handleChange}/>
                                  
                                </div>
                            </div>
                        </div>

                        {/* Localisation */}
                        <div className="bg-white rounded-xl shadow-sm space-y-4">
                            <h5 className="font-semibold flex items-center gap-2 border-b border-gray-300 px-6 py-4">
                                <MapPin size={18} /> Localisation
                            </h5>
                            <div className="space-y-2  p-6 ">
                                <label className="text-sm font-medium text-gray-600">Ville <span className="text-red-500">*</span></label>
                                <Select options={villeOptions} value={profileForm.ville} onChange={handleVilleChange}/>
                                {validationErrors.ville && (
                                    <p className="text-xs text-red-500">{validationErrors.ville}</p>
                                )}
                            </div>
                        </div>
                    </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
