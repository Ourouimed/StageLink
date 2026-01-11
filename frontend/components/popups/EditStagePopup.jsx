import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textares"
import { moroccoCities } from "@/utils/cities"
import { Button } from "../ui/Button"
import { Pencil, Plus } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useToast } from "@/hooks/useToast"
import { createStage, updateStage } from "@/store/features/offre-stage/offreStageSlice"
import { usePopup } from "@/hooks/usePopup"

const TYPE_STAGE = [
  "Stage pré embauche",
  "Stage d’initiation / d’observation",
  "Convention de stage académique"
]

export const SPECIALITIES = [
  "IT & Développement",
  "Développement Web",
  "Développement Mobile",
  "Data & IA",
  "Cybersécurité",
  "Réseaux & Systèmes",
  "Design UI/UX",
  "Marketing Digital",
  "Gestion & Comptabilité",
  "Ressources Humaines",
  "Commerce & Vente",
  "Logistique",
  "Finance",
  "Industrie & Maintenance",
  "Génie Civil",
]

const DISPONIBILITE = [
  { label: "Temps plein", value: "Temps plein" },
  { label: "Temps partiel", value: "Temps partiel" }
]

export default function EditStagePopup({stage , id}) {
    console.log(stage)
  const [offreForm, setOffreForm] = useState({
    titre: stage.titre || "",
    type_stage: stage.type_stage || "",
    specialite: stage.specialite || "",
    ville: stage.ville || "",
    duree: stage.duree_months || "",
    nbr_places: stage.nombre_profiles || "",
    description: stage.description || "",
    demarage: stage.demarage.split("T")[0] || "",
    disponibilite: stage.disponibilite || ""
  })

  const [validationErrors, setValidationErrors] = useState({})

  const dispatch = useDispatch()
  const toast = useToast()
  const { isLoading } = useSelector(state => state.stage)
  const { closePopup } = usePopup()

  const handleChange = (e) => {
    const { id, value } = e.target
    setOffreForm(prev => ({ ...prev, [id]: value }))
    setValidationErrors(prev => ({ ...prev, [id]: "" }))
  }

  const handleSelectChange = (key, value) => {
    setOffreForm(prev => ({ ...prev, [key]: value }))
    setValidationErrors(prev => ({ ...prev, [key]: "" }))
  }

  const validateForm = () => {
    const errors = {}

    if (!offreForm.titre.trim()) errors.titre = "Le titre est requis"
    if (!offreForm.type_stage) errors.type_stage = "Le type de stage est requis"
    if (!offreForm.specialite) errors.specialite = "La spécialité est requise"
    if (!offreForm.ville) errors.ville = "La ville est requise"
    if (!offreForm.duree) errors.duree = "La durée est requise"
    if (!offreForm.nbr_places || offreForm.nbr_places < 1)
      errors.nbr_places = "Au moins une place est requise"
    if (!offreForm.description.trim())
      errors.description = "La description est requise"
    if (!offreForm.demarage)
      errors.demarage = "La date de démarrage est requise"
    if (!offreForm.disponibilite)
      errors.disponibilite = "La disponibilité est requise"

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleUpdateStage = async () => {
    if (!validateForm()) return

    try {
      await dispatch(updateStage({...offreForm , id})).unwrap()
      toast.success("Offre créée avec succès")
      setOffreForm({
        titre: "",
        type_stage: "",
        specialite: "",
        ville: "",
        duree: "",
        nbr_places: 1,
        description: "",
        demarage: "",
        disponibilite: ""
      })
      closePopup()
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <div className="space-y-6">

      {/* Titre + Type */}
      <div className="flex gap-2">
        <InputBlock
          label="Titre"
          id="titre"
          value={offreForm.titre}
          onChange={handleChange}
          error={validationErrors.titre}
        />

        <SelectBlock
          label="Type de stage"
          value={offreForm.type_stage}
          options={TYPE_STAGE.map(s => ({ label: s, value: s }))}
          onChange={(v) => handleSelectChange("type_stage", v)}
          error={validationErrors.type_stage}
        />
      </div>

      {/* Spécialité + Ville */}
      <div className="flex gap-2">
        <SelectBlock
          label="Spécialité"
          options={SPECIALITIES.map(s => ({ label: s, value: s }))}
          value={offreForm.specialite}
          onChange={(v) => handleSelectChange("specialite", v)}
          error={validationErrors.specialite}
        />

        <SelectBlock
          label="Ville"
          options={moroccoCities.map(c => ({ label: c, value: c }))}
          value={offreForm.ville}
          onChange={(v) => handleSelectChange("ville", v)}
          error={validationErrors.ville}
        />
      </div>

      {/* Durée + Places */}
      <div className="flex gap-2">
        <SelectBlock
          label="Durée (mois)"
          options={[1, 3, 6, 12].map(m => ({ label: `${m} mois`, value: m }))}
          value={offreForm.duree}
          onChange={(v) => handleSelectChange("duree", v)}
          error={validationErrors.duree}
        />

        <InputBlock
          label="Places disponibles"
          id="nbr_places"
          type="number"
          value={offreForm.nbr_places}
          onChange={handleChange}
          error={validationErrors.nbr_places}
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Description <span className="text-red-500">*</span>
        </label>

        <Textarea
          id="description"
          rows={4}
          value={offreForm.description}
          onChange={handleChange}
          placeholder='Décrivez le stage, missions, profil recherché...'
        />

        {validationErrors.description && (
          <p className="text-xs text-red-500">
            {validationErrors.description}
          </p>
        )}
      </div>

      {/* Démarrage + Disponibilité */}
      <div className="flex gap-2">
        <InputBlock
          label="Date de démarrage"
          id="demarage"
          type="date"
          value={offreForm.demarage}
          onChange={handleChange}
          error={validationErrors.demarage}
        />

        <SelectBlock
          label="Disponibilité"
          options={DISPONIBILITE}
          value={offreForm.disponibilite}
          onChange={(v) => handleSelectChange("disponibilite", v)}
          error={validationErrors.disponibilite}
        />
      </div>

      <div className="flex justify-end">
        <Button
          variant="main"
          size="sm"
          disabled={isLoading}
          onClick={handleUpdateStage}
        >
          Modifier l'offre <Pencil />
        </Button>
      </div>
    </div>
  )
}



const InputBlock = ({ label, error, ...props }) => (
  <div className="space-y-1 flex-1">
    <label className="text-sm font-medium">
      {label} <span className="text-red-500">*</span>
    </label>

    <Input
      {...props}
    />

    {error && (
      <p className="text-xs text-red-500">{error}</p>
    )}
  </div>
)

const SelectBlock = ({ label, options, value, onChange, error }) => (
  <div className="space-y-1 flex-1">
    <label className="text-sm font-medium">
      {label} <span className="text-red-500">*</span>
    </label>

    <Select
      options={options}
      value={value}
      onChange={onChange}
    />

    {error && (
      <p className="text-xs text-red-500">{error}</p>
    )}
  </div>
)
