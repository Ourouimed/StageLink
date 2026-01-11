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
  MapPin,
  FileText,
  ExternalLink
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NIVEAUX = ['Bac', 'Bac+1', 'Bac+2', 'Bac+3', 'Bac+5', 'Bac+8'];

export default function ProfileEtudiants() {
  const { profile, isLoading: isProfileLoading } = useSelector(state => state.etudiant);
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
    bio: "",
    cv: null 
  });

  const [currentCvUrl, setCurrentCvUrl] = useState("");
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
        bio: profile.bio || "",
        cv: null
      });
      setCurrentCvUrl(profile.cv || ""); 
    }
  }, [profile]);

  const handleChange = (e) => {
    setProfileForm(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Seuls les fichiers PDF sont acceptés");
        return;
      }
      setProfileForm(prev => ({ ...prev, cv: file }));
    }
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

    const formData = new FormData();
    Object.keys(profileForm).forEach(key => {
      if (key === 'cv') {
        if (profileForm.cv) formData.append('cv', profileForm.cv);
      } else {
        formData.append(key, profileForm[key]);
      }
    });

    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast.success("Profil mis à jour avec succès");
    } catch (err) {
      toast.error(err);
    }
  };

  const villeOptions = moroccoCities.map(v => ({ value: v, label: v }));
  const niveauOptions = NIVEAUX.map(n => ({ value: n, label: n }));

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-2xl font-bold text-gray-800">Mon profil étudiant</h4>
          <Button
            variant="main"
            size="sm"
            className={isProfileLoading && 'opacity-70'}
            onClick={handleUpdateProfile}
            disabled={isProfileLoading}
          >
            {isProfileLoading ? 'Enregistrement en cours...' : 'Enregistrer'} <Pen size={16} className="ml-2" />
          </Button>
        </div>

        <div className="grid gap-8">
          {/* Section 1: Identité */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
                  {validationErrors.nom && <p className="text-red-500 text-xs mt-1">{validationErrors.nom}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium">Prénom <span className="text-red-500">*</span></label>
                  <Input id="prenom" value={profileForm.prenom} onChange={handleChange} />
                  {validationErrors.prenom && <p className="text-red-500 text-xs mt-1">{validationErrors.prenom}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium">Date de naissance <span className="text-red-500">*</span></label>
                  <Input id="date_naissance" type="date" value={profileForm.date_naissance} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-sm font-medium">Niveau scolaire <span className="text-red-500">*</span></label>
                  <Select options={niveauOptions} value={profileForm.niveau_scolaire} onChange={handleNiveauChange} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Bio & CV */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <label className="text-sm font-medium flex items-center gap-2 mb-4">
                  <FileText size={18} className="text-main" /> Bio <span className="text-red-500">*</span>
              </label>
              <Textarea
                maxLength={500}
                id='bio'
                rows="5"
                placeholder="Parlez-nous de votre parcours..."
                value={profileForm.bio}
                onChange={handleChange}
              />
              <div className="flex justify-between items-center mt-2">
                {validationErrors.bio && <p className="text-xs text-red-500">{validationErrors.bio}</p>}
                <span className={`text-sm text-gray-400 ${profileForm.bio.length >= 500 ? 'text-red-500 font-bold' : ''}`}>
                  {profileForm.bio.length}/500
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <label className="text-sm font-medium flex items-center gap-2 mb-4">
                <FileText size={18} className="text-main" /> Mon CV <span className="text-red-500">*</span>
              </label>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-main transition-colors relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500">
                    {profileForm.cv ? profileForm.cv.name : "Cliquez pour charger votre CV (PDF)"}
                  </p>
                </div>
                {currentCvUrl && (
                  <a
                    href={currentCvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm text-main font-medium p-2 bg-main/5 rounded-lg border border-main/10 hover:bg-main/10"
                  >
                    Voir le CV actuel <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Liens & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <h5 className="font-semibold flex items-center gap-2 border-b border-gray-300 px-6 py-4">
                <Globe size={18} className="text-main" /> Présence en ligne
              </h5>
              <div className="space-y-3 p-6">
                <Input id='website' icon={Globe} type="url" placeholder="Site web / Portfolio" value={profileForm.website} onChange={handleChange} />
                <Input id='linkedin' icon={Linkedin} type="url" placeholder="Profil LinkedIn" value={profileForm.linkedin} onChange={handleChange} />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <h5 className="font-semibold flex items-center gap-2 border-b border-gray-300 px-6 py-4">
                <MapPin size={18} className="text-main" /> Localisation
              </h5>
              <div className="p-6 space-y-2">
                <label className="text-sm font-medium text-gray-600">Ville <span className="text-red-500">*</span></label>
                <Select options={villeOptions} value={profileForm.ville} onChange={handleVilleChange} />
                {validationErrors.ville && <p className="text-xs text-red-500 mt-1">{validationErrors.ville}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}