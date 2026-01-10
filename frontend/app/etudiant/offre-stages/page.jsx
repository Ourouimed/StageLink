'use client'

import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/Button"
import { useToast } from "@/hooks/useToast"
import { createCandidature } from "@/store/features/candidatures/candidatureSlice"
import { getAllStages } from "@/store/features/offre-stage/offreStageSlice"
import { Save, Zap } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function OffreDeStagesSearch() {
  const dispatch = useDispatch()
  const toast = useToast()
  const { stages } = useSelector(state => state.stage)

  const [search, setSearch] = useState("")
  const [ville, setVille] = useState("all")
  const [sort, setSort] = useState("recent")
  const [selectedStage, setSelectedStage] = useState(null)

  useEffect(() => {
    dispatch(getAllStages())
  }, [dispatch])

  const handleCreateCandidature = async ()=>{
    try {
        await dispatch(createCandidature(selectedStage.stage_id)).unwrap()
        toast.success('Candidature cree avec success')
    }
    catch (err){
        toast.error(err)
    }
  }

  const filteredStages = useMemo(() => {
    let data = [...stages]

    if (search) {
      data = data.filter(s =>
        `${s.titre} ${s.entreprise} ${s.ville}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    }

    if (ville !== "all") {
      data = data.filter(s => s.ville === ville)
    }

    if (sort === "recent") {
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
    if (sort === "duration") {
      data.sort((a, b) => b.duree_months - a.duree_months)
    }

    return data
  }, [stages, search, ville, sort])

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Rechercher un stage..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
          >
            <option value="all">Toutes les villes</option>
            <option value="Rabat">Rabat</option>
            <option value="Casablanca">Casablanca</option>
            <option value="Salé">Salé</option>
          </select>

          <select
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="recent">Plus récents</option>
            <option value="duration">Durée la plus longue</option>
          </select>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* List */}
          <div className="lg:col-span-1 space-y-3">
            {filteredStages.length === 0 ? (
              <div className="border border-gray-300 rounded-xl p-6 text-center text-gray-600">
                Aucun stage trouvé
              </div>
            ) : (
              filteredStages.map(stage => (
                <div
                  key={stage.titre}
                  onClick={() => setSelectedStage(stage)}
                  className={`border border-gray-300 rounded-xl p-4 cursor-pointer transition
                    ${selectedStage?.titre === stage.titre ? "bg-gray-50" : "hover:bg-gray-50"}
                  `}
                >
                  <h3 className="font-semibold">{stage.titre}</h3>
                  <p className="text-sm text-gray-600">
                    {stage.entreprise} · {stage.ville}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            {!selectedStage ? (
              <div className="border border-gray-300 rounded-xl p-8 text-center text-gray-500">
                Sélectionnez un stage pour voir les détails
              </div>
            ) : (
              <div className="border border-gray-300 rounded-xl p-6 space-y-5">

               <div className="flex items-center justify-between">
                     <div>
                        <h2 className="text-xl font-bold">
                            {selectedStage.titre}
                        </h2>
                        <p className="text-gray-600">
                            {selectedStage.entreprise} · {selectedStage.ville}
                        </p>
                    </div>


                    {/* CTA */}
                    <div className="flex gap-1 items-center">
                        <Button size="sm" variant="main" onClick={handleCreateCandidature}>
                            <Zap size={12}/> Postuler
                        </Button>
                        <Button size="sm" outline>
                            <Save size={12}/> Enregistrer
                        </Button>
                    </div>
               </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <Info label="Type" value={selectedStage.type_stage} />
                  <Info label="Spécialité" value={selectedStage.specialite} />
                  <Info label="Durée" value={`${selectedStage.duree_months} mois`} />
                  <Info label="Disponibilité" value={selectedStage.disponibilite} />
                </div>

                <div>
                  <h3 className="font-semibold mb-1">Description</h3>
                  <p className="text-gray-700">
                    {selectedStage.description}
                  </p>
                </div>

                

              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const Info = ({ label, value }) => (
  <div className="border border-gray-300 rounded-lg p-3">
    <p className="text-gray-500 text-xs">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
)
