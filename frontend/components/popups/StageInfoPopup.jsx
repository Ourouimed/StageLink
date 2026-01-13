'use client'
import { useDispatch, useSelector } from "react-redux";
import { User, BookOpen, Briefcase, Save, Building, CheckCircle, X, Check, FileUp, Download } from "lucide-react";
import { Button } from "../ui/Button";
import { useToast } from "@/hooks/useToast";
import { addNoteEvaluation, endStage } from "@/store/features/entreprise/entrepriseSlice";
import { Input } from "../ui/Input";
import { useState } from "react";
import { addNotePedagogique } from "@/store/features/encadrant/encadrantSlice";
import { usePopup } from "@/hooks/usePopup";
import { uploadRapport } from "@/store/features/etudiant/etudiantSlice";

export default function EditStageComp({ stage }) {
    const { user } = useSelector((state) => state.auth);
    const { closePopup } = usePopup();
    const { isLoading: noteEvalLoading } = useSelector(state => state.entreprise);
    const { isLoading: notePedaLoading } = useSelector(state => state.encadrant);
    
    const [note, setNote] = useState(
        user.role === 'entreprise' ? stage.note_evaluation : 
        user.role === 'encadrant' ? stage.note_pedagogique : 0
    );

    // New state for file upload
    const [rapport, setRapport] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const toast = useToast();
    const dispatch = useDispatch();

    const handleAddNote = async () => {
        const numericNote = parseFloat(note);
        if (isNaN(numericNote) || numericNote < 0 || numericNote > 20) {
            return toast.error("La note doit être comprise entre 0 et 20");
        }

        try {
            if (user.role === 'entreprise') {
                await dispatch(addNoteEvaluation({ id: stage.stage_id, note: numericNote })).unwrap();
                toast.success('Note d\'évaluation enregistrée');
            } else if (user.role === 'encadrant') {
                await dispatch(addNotePedagogique({ id: stage.stage_id, note: numericNote })).unwrap();
                toast.success('Note pédagogique enregistrée');
            }
            closePopup();
        } catch (err) {
            toast.error(err);
        }
    };

    const handleEndStage = async ()=>{
        try {
            await dispatch(endStage(stage.stage_id)).unwrap()
            toast.success('Stage terminé avec succès')
            closePopup();
        } catch (err) {
            toast.error(err);
        }
    }

    const handleFileUpload = async () => {
    if (!rapport) return toast.error("Veuillez sélectionner un fichier");

    if (rapport.size > 5 * 1024 * 1024) {
        return toast.error("Le fichier est trop volumineux (max 5Mo)");
    }

    const formData = new FormData();
    formData.append("rapport", rapport);
    formData.append("stage_id", stage.stage_id);

    setIsUploading(true);
    try {
        await dispatch(uploadRapport(formData)).unwrap();
        
        toast.success("Rapport envoyé avec succès");
        setRapport(null);
        closePopup();
    } catch (err) {
        toast.error(err);
    } finally {
        setIsUploading(false);
    }
};

    const isSubmitting = noteEvalLoading || notePedaLoading;

    return (
        <div className="space-y-6 p-2">
            {/* Header Info */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{stage.titre}</h3>
                    <p className="text-sm text-gray-500 capitalize">{stage.type_stage}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    stage.status === 'finished' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                }`}>
                    {stage.status}
                </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} className="text-gray-400" />
                    <span><strong>Étudiant:</strong> {stage.etudiant}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building size={16} className="text-gray-400" />
                    <span><strong>Entreprise:</strong> {stage.entreprise}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen size={16} className="text-gray-400" />
                    <span><strong>Spécialité:</strong> {stage.specialite}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} className="text-gray-400" />
                    <span><strong>Encadrant:</strong> {stage.encadrant}</span>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Grading Section */}
            <div className="space-y-6">
                {(user?.role === 'entreprise' || user?.role === 'encadrant') && stage.status !== 'finished' && (
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col gap-2">
                        <label className="text-sm font-bold text-blue-900 flex items-center gap-2">
                            <CheckCircle size={14} />
                            Modifier votre note ({user.role === 'entreprise' ? "Entreprise" : "Encadrant"})
                        </label>
                        <Input 
                            type="number" 
                            max="20" min="0" step="0.5"
                            value={note}
                            onChange={(e) => setNote(e.target.value)} 
                            placeholder="Ex: 15.5"
                            className="bg-white"
                        />
                    </div>
                )}

                <div className="grid grid-cols-3 gap-2 bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-center border-r border-gray-200">
                        <p className="text-[10px] text-gray-400 uppercase font-black mb-1 leading-tight">Note<br/>Evaluation</p>
                        <p className="text-lg font-bold text-gray-700">
                            {stage.note_evaluation ?? "--"} <span className="text-[10px] text-gray-400">/20</span>
                        </p>
                    </div>

                    <div className="text-center border-r border-gray-200">
                        <p className="text-[10px] text-gray-400 uppercase font-black mb-1 leading-tight">Note<br/>Pédagogique</p>
                        <p className="text-lg font-bold text-gray-700">
                            {stage.note_pedagogique ?? "--"} <span className="text-[10px] text-gray-400">/20</span>
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-[10px] text-blue-500 uppercase font-black mb-1 leading-tight">Moyenne<br/>Finale</p>
                        <p className="text-lg font-extrabold text-blue-600">
                            {stage.note_final ?? "--"} <span className="text-[10px] text-blue-400">/20</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* NEW: Student Report Upload Section */}
           {stage.status === 'finished' && user.role === 'etudiant' && (
    <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <FileUp size={16} /> Rapport de stage (PDF uniquement)
        </label>
        <div className="flex flex-col gap-3">
            <input 
                type="file" 
                accept="application/pdf"
                onChange={(e) => setRapport(e.target.files[0])}
                className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100 transition-all cursor-pointer"
            />
            {rapport && (
                <div className="flex items-center justify-between bg-white p-2 rounded border border-gray-200">
                    <span className="text-xs text-gray-600 truncate max-w-[200px]">
                        {rapport.name}
                    </span>
                    <Button 
                        variant="main" 
                        size="sm" 
                        onClick={handleFileUpload}
                        disabled={isUploading}
                    >
                        {isUploading ? "Téléchargement..." : "Confirmer l'envoi"}
                    </Button>
                </div>
            )}
        </div>
    </div>
)}

            {/* Bottom Actions */}
            <div className="flex justify-end pt-2 gap-2">
                {stage.status === 'finished' && stage.rapport_stage && (
                    <Button 
                        outline 
                        size="sm"
                        href={stage.rapport_stage}
                    >
                        <Download className="mr-2" size={16}/>
                        Télécharger Rapport de stage
                    </Button>
                )}

                {user.role !== 'etudiant' && stage.status !== 'finished' && (
                    <>
                        {user.role === 'entreprise' && (
                            <Button 
                                outline variant="success" size="sm"
                                onClick={handleEndStage}>
                                <Check className="mr-2" size={16}/>
                                Terminer le stage
                            </Button>
                        )}
                        <Button 
                            variant="main" 
                            size="sm" 
                            onClick={handleAddNote}
                            disabled={isSubmitting}
                            className={`shadow-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? "Enregistrement..." : "Valider la note"}
                            {!isSubmitting && <Save className="ml-2" size={16}/>}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}