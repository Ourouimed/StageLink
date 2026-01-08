'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textares";
import { useToast } from "@/hooks/useToast";
import { getProfile } from "@/store/features/entreprise/entrepriseSlice";
import { updateProfile } from "@/store/features/entreprise/entrepriseSlice";
import { moroccoCities } from "@/utils/cities";
import { Pen, Upload, Globe, Linkedin, MapPin, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const SECTEURS  = ['Developpement & IT' , 'Marketing Communication' , 'Sante' , 'Banque et economie']
const TYPE_ENTREPRISE  = ['Public' , 'Semi-public' , 'Startup']

export default function ProfileEntreprise() {
    const {profile , isLoading : isProfileLoading} = useSelector(state => state.entreprise)
    const dispatch = useDispatch()
    const toast = useToast()

    useEffect(()=>{
        dispatch(getProfile())
    }, [dispatch])


    const [profileForm , setProfileForm] = useState({
        entreprise :  "",
        secteur :  "" ,
        type : "" ,
        ville :  "" , 
        website : "" ,
        linkedin :  "" ,
        description :  ""
    })


    const [validationErrors , setValidationErrors] = useState({})

    useEffect(() => {
        if (profile) {
            setProfileForm({
            entreprise: profile.nom_entreprise || "",
            secteur: profile.secteur || "",
            type: profile.type_entreprise || "",
            ville: profile.ville || "",
            website: profile.website || "",
            linkedin: profile.linkedin || "",
            description : profile.description || ""
            });
        }
    }, [profile]);



    const handleChange = e =>{
        setProfileForm(prev => ({...prev , [e.target.id] : e.target.value}))
    }

    const handleSecteurChange = (value) => {
        setProfileForm(prev => ({...prev , secteur : value}))
    };


    const handleTypeChange = (value) => {
        setProfileForm(prev => ({...prev , type : value}))
    };

     const handleVilleChange = (value) => {
        setProfileForm(prev => ({...prev , ville : value}))
    };



    const secteurOption = SECTEURS.map((n) => ({ value: n, label: n }));
    const typeEntrOption = TYPE_ENTREPRISE.map((n) => ({ value: n, label: n }));
    const villeOptions = moroccoCities.map((n) => ({ value: n, label: n }));

    const validateForm = ()=>{
         const errors = {};
         if (!profileForm.entreprise.trim()) errors.entreprise = "Nom d'entreprise est obligatoire"
         if (!profileForm.secteur.trim()) errors.secteur = "Secteur d'activite est obligatoire"
         if (!profileForm.type.trim()) errors.type = "type d'entreprise est obligatoire"
         if (!profileForm.description.trim()) errors.description = "description est obligatoire"
         if (!profileForm.ville.trim()) errors.ville = "ville d'entreprise est obligatoire"

         setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }
    const handleUpdateProfile = async ()=>{
        if (!validateForm()) return null
        try {
            await dispatch(updateProfile(profileForm)).unwrap()
            toast.success('Profile updated successfully')
        }
        catch (err){
            toast.error(err)
        }
        
    }

    return (
        <DashboardLayout>
            <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h4 className="text-2xl font-bold text-gray-800">
                        Mon profil entreprise
                    </h4>
                    <Button variant="main" size='sm' className={isProfileLoading && 'opacity-70'} onClick={handleUpdateProfile} disabled={isProfileLoading}>
                        {isProfileLoading ? 'Enregistrement en cours...' : 'Enregistrer'} <Pen size={16} />
                    </Button>
                </div>

                <div className="grid gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                                    <Building2 size={40} className="text-gray-400" />
                                </div>
                                <button className="absolute -bottom-2 -right-2 p-2 bg-main text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                                    <Upload size={16} />
                                </button>
                            </div>

                            {/* Nom & Secteur */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nom d'entreprise <span className="text-red-500">*</span></label>
                                    <Input id='entreprise' type="text" placeholder="Ex: Tech Solutions"  value={profileForm.entreprise} onChange={handleChange}/>
                                    {validationErrors.entreprise && (
                                        <p className="text-xs text-red-500">{validationErrors.entreprise}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Secteur d'activité <span className="text-red-500">*</span></label>
                                    <Select options={secteurOption} value={profileForm.secteur} onChange={handleSecteurChange}/>
                                    {validationErrors.secteur && (
                                        <p className="text-xs text-red-500">{validationErrors.secteur}</p>
                                    )}
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium">Type d'entreprise <span className="text-red-500">*</span></label>
                                    <Select options={typeEntrOption} value={profileForm.type} onChange={handleTypeChange}/>
                                    {validationErrors.type && (
                                        <p className="text-xs text-red-500">{validationErrors.type}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Description */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <label className="text-sm font-medium flex items-center gap-2">
                            Description de l'entreprise <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                            maxLength={500}
                            id='description'
                            rows="4" 
                            placeholder="Parlez-nous de votre mission, vision..."
                            value={profileForm.description}
                            onChange={handleChange}
                        ></Textarea>
                        <div className="flex justify-between items-center mt-2">
                            

                            {validationErrors.description && (
                                <p className="text-xs text-red-500">{validationErrors.description}</p>
                            )}

                            <span className={`text-sm text-gray-400 ${profileForm.description.length === 500 && 'text-red-500'}`}>
                                {profileForm.description.length}/500
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
                                    <Input id='website'  icon={Globe} type="url" placeholder="https://example.com"  value={profileForm.website} onChange={handleChange}/>
                                  
                                </div>
                                <div className="relative">
                                    <Input id='linkedin' icon={Linkedin} type="url" placeholder="https://linkedin.com/exemple"  value={profileForm.linkedin} onChange={handleChange}/>
                                  
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