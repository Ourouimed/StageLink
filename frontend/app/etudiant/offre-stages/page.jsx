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
import { Bookmark, Zap, Calendar, Briefcase, MapPin, Clock, ArrowLeft } from "lucide-react"; // Added ArrowLeft
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
  
  // Track if we are in "mobile detail mode"
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  useEffect(() => {
    dispatch(getAllStages());
  }, [dispatch]);

  // Initial selection only for desktop
  useEffect(() => {
    if (filteredStages.length > 0 && !selectedStage && window.innerWidth > 1024) {
      setSelectedStage(filteredStages[0]);
    }
  }, [stages]);

  const handleCreateCandidature = async () => {
    try {
      await dispatch(createCandidature(selectedStage.stage_id)).unwrap();
      toast.success("Candidature créée avec succès");
    } catch (err) {
      toast.error(err);
    }
  };

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
    }
    if (sort === "duration") {
      data.sort((a, b) => b.duree_months - a.duree_months);
    }
    return data;
  }, [stages, search, ville, sort]);

  const handleStageClick = (stage) => {
    setSelectedStage(stage);
    setShowMobileDetails(true); // Switch view on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        
        {/* Header - Hide on mobile details view to save space */}
        <div className={`${showMobileDetails ? "hidden lg:flex" : "flex"} flex-col gap-1`}>
          <h1 className="text-2xl font-bold text-gray-900">Explorer les Stages</h1>
          <p className="text-gray-500">Trouvez l'opportunité qui correspond à votre profil</p>
        </div>

        {/* Filters Bar - Hide on mobile details view */}
        <div className={`${showMobileDetails ? "hidden lg:flex" : "flex"} bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex-col md:flex-row gap-3`}>
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Poste, entreprise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          <div className="w-full md:w-64">
            <Select
              options={[{ label: "Toutes les villes", value: "all" }, ...moroccoCities.map((v) => ({ label: v, value: v }))]}
              value={ville}
              onChange={setVille}
            />
          </div>
          <div className="w-full md:w-56">
            <Select
              options={[
                { label: "Plus récents", value: "recent" },
                { label: "Durée (Longue)", value: "duration" },
              ]}
              value={sort}
              onChange={setSort}
            />
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* List Section (Hidden on mobile if details are shown) */}
          <div className={`${showMobileDetails ? "hidden lg:block" : "block"} lg:col-span-4 space-y-4 lg:max-h-[calc(100vh-250px)] overflow-y-auto pr-2`}>
            {filteredStages.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500">
                Aucun stage ne correspond à vos critères
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

          {/* Details Section (Hidden on mobile if list is shown) */}
          <div className={`${showMobileDetails ? "block" : "hidden lg:block"} lg:col-span-8 sticky top-6`}>
            
            {/* Mobile Return Button */}
            <div className="lg:hidden mb-4">
              <button 
                onClick={() => setShowMobileDetails(false)}
                className="flex items-center gap-2 text-gray-600 font-medium p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                Retour aux offres
              </button>
            </div>

            {!selectedStage ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl h-[400px] flex items-center justify-center text-gray-400">
                Sélectionnez une offre pour voir le détail
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Detailed Header */}
                <div className="p-6 md:p-8 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                      <span className="text-main font-bold text-xs uppercase tracking-widest">
                        {selectedStage.specialite}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1 leading-tight">
                        {selectedStage.titre}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-600">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Briefcase size={16} /> {selectedStage.entreprise}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={16} /> {selectedStage.ville}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <Button className="flex-1 md:flex-none" variant="main" size="sm" onClick={handleCreateCandidature}>
                        <Zap size={16} className="fill-current" /> Postuler
                      </Button>
                      <Button variant="main" size="sm" outline>
                        <Bookmark size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <DetailItem icon={<Calendar size={18} />} label="Démarrage" value={formatDate(selectedStage.demarage)} />
                    <DetailItem icon={<Clock size={18} />} label="Durée" value={`${selectedStage.duree_months} Mois`} />
                    <DetailItem icon={<Zap size={18} />} label="Dispo" value={selectedStage.disponibilite} />
                    <DetailItem icon={<Briefcase size={18} />} label="Postes" value={`${selectedStage.nombre_profiles}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">À propos du stage</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                      {selectedStage.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 md:px-8 py-4 bg-gray-50 text-[11px] text-gray-400 flex justify-between">
                  <span>ID: {selectedStage.stage_id}</span>
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
      <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-bold tracking-tighter truncate">{label}</p>
      <p className="text-xs md:text-sm font-semibold text-gray-700 truncate">{value}</p>
    </div>
  </div>
);