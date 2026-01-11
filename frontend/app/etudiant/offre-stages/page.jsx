"use client";

import { EtudiantStageCard } from "@/components/cards/EtudiantStageCard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/hooks/useToast";
import { createCandidature } from "@/store/features/candidatures/candidatureSlice";
import { getAllStages } from "@/store/features/offre-stage/offreStageSlice";
import { moroccoCities } from "@/utils/cities";
import { Bookmark, Zap, Calendar, Briefcase, MapPin, Clock, ArrowLeft, Search, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OffreDeStagesSearch() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { stages } = useSelector((state) => state.stage);

  const [search, setSearch] = useState("");
  const [ville, setVille] = useState("all");
  const [sort, setSort] = useState("recent");
  const [selectedStage, setSelectedStage] = useState(null);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  useEffect(() => {
    dispatch(getAllStages());
  }, [dispatch]);

  // Handle browser back button to close mobile details
  useEffect(() => {
    const handlePopState = () => {
      if (showMobileDetails) {
        setShowMobileDetails(false);
        // Prevent actual navigation back
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    if (showMobileDetails) {
      window.history.pushState(null, "", window.location.pathname);
      window.addEventListener("popstate", handlePopState);
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, [showMobileDetails]);

  // Desktop default selection
  useEffect(() => {
    if (stages.length > 0 && !selectedStage && window.innerWidth > 1024) {
      setSelectedStage(stages[0]);
    }
  }, [stages, selectedStage]);

  const filteredStages = useMemo(() => {
    let data = [...stages];
    if (search) {
      data = data.filter((s) =>
        `${s.titre} ${s.entreprise} ${s.ville}`.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (ville !== "all") {
      data = data.filter((s) => s.ville === ville);
    }
    if (sort === "recent") {
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sort === "duration") {
      data.sort((a, b) => b.duree_months - a.duree_months);
    }
    return data;
  }, [stages, search, ville, sort]);

  const handleStageClick = (stage) => {
    setSelectedStage(stage);
    if (window.innerWidth < 1024) {
      setShowMobileDetails(true);
      window.scrollTo(0, 0);
    }
  };

  const handleCreateCandidature = async () => {
    try {
      await dispatch(createCandidature(selectedStage.stage_id)).unwrap();
      toast.success("Candidature créée avec succès");
    } catch (err) {
      toast.error(err);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-0">
        
        {/* Header Logic */}
        {!showMobileDetails && (
          <div className="flex flex-col gap-1 animate-in fade-in duration-500">
            <h1 className="text-2xl font-bold text-gray-900">Explorer les Stages</h1>
            <p className="text-gray-500">Trouvez l'opportunité qui correspond à votre profil</p>
          </div>
        )}

        {/* Filters Logic */}
        {!showMobileDetails && (
          <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3 animate-in slide-in-from-top-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Poste, entreprise..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 border-none bg-gray-50 focus:bg-white transition-all rounded-xl"
              />
            </div>
            <div className="w-full md:w-64">
              <Select
                options={[{ label: "Toutes les villes", value: "all" }, ...moroccoCities.map(v => ({ label: v, value: v }))]}
                value={ville}
                onChange={setVille}
              />
            </div>
            <div className="w-full md:w-56">
              <Select
                options={[{ label: "Plus récents", value: "recent" }, { label: "Durée", value: "duration" }]}
                value={sort}
                onChange={setSort}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* List Section */}
          <div className={`${showMobileDetails ? "hidden lg:block" : "block"} lg:col-span-4 space-y-4 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:pr-2 custom-scrollbar`}>
            {filteredStages.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center text-gray-500">
                Aucun stage trouvé
              </div>
            ) : (
              filteredStages.map((stage) => (
                <EtudiantStageCard
                  key={stage.stage_id}
                  stage={stage}
                  isActive={selectedStage?.stage_id === stage.stage_id}
                  onClick={() => handleStageClick(stage)}
                />
              ))
            )}
          </div>

          {/* Details Section */}
          <div className={`${showMobileDetails ? "block" : "hidden lg:block"} lg:col-span-8 sticky top-6`}>
            {showMobileDetails && (
              <button 
                onClick={() => setShowMobileDetails(false)}
                className="flex items-center gap-2 text-main font-semibold mb-4 bg-main/5 px-4 py-2 rounded-xl"
              >
                <ArrowLeft size={20} /> Retour aux offres
              </button>
            )}

            {!selectedStage ? (
              <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl h-[500px] flex items-center justify-center text-gray-400">
                Sélectionnez une offre pour voir le détail
              </div>
            ) : (
              <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Detailed Header */}
                <div className="p-6 md:p-10 border-b border-gray-50">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                    <div className="space-y-2">
                      <span className="bg-main/10 text-main px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {selectedStage.specialite}
                      </span>
                      <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                        {selectedStage.titre}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                        <span className="flex items-center gap-1.5"><Briefcase size={16} /> {selectedStage.entreprise}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={16} /> {selectedStage.ville}</span>
                      </div>
                    </div>
                     <div className="flex items-center gap-2 w-full md:w-auto">

                      <Button className="flex-1 md:flex-none" variant="main" size="sm" onClick={handleCreateCandidature}>

                        <Zap size={16} className="fill-current" /> Postuler

                      </Button>

                      <Button variant="main" size="sm" outline>

                        <Bookmark size={16} /> Enregistrer

                      </Button>

                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem icon={<Calendar size={20} />} label="Démarrage" value={formatDate(selectedStage.demarage)} />
                    <DetailItem icon={<Clock size={20} />} label="Durée" value={`${selectedStage.duree_months} Mois`} />
                    <DetailItem icon={<Zap size={20} />} label="Type" value={selectedStage.disponibilite} />
                    <DetailItem icon={<Briefcase size={20} />} label="Profils" value={`${selectedStage.nombre_profiles}`} />
                    <DetailItem icon={<Users size={20} />} label="Candidats" value={`${selectedStage.nombre_candidatures || 0}`} />
                  </div>
                </div>

                <div className="p-6 md:p-10">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Description du poste</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {selectedStage.description}
                  </p>
                </div>

                <div className="px-10 py-6 bg-gray-50 flex justify-between items-center text-[11px] text-gray-400 border-t border-gray-100">
                  <span className="font-mono">REF: {selectedStage.stage_id}</span>
                  <span>Publié le {formatDate(selectedStage.created_at)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

const DetailItem = ({ icon, label, value }) => (
  <div className="bg-gray-50 p-2 md:p-3 rounded-xl border border-gray-100 flex items-center gap-2 md:gap-3">
    <div className="text-main bg-white p-1.5 md:p-2 rounded-lg shadow-sm shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-bold ">{label}</p>
      <p className="text-xs md:text-sm font-semibold text-gray-700">{value}</p>
    </div>
  </div>
);