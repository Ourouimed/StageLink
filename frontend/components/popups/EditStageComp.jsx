'use client'
import { useDispatch, useSelector } from "react-redux";
import { User, BookOpen, Briefcase, Save, Building, CheckCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { useToast } from "@/hooks/useToast";
import { addNoteEvaluation } from "@/store/features/entreprise/entrepriseSlice";
import { Input } from "../ui/Input";
import { useState } from "react";
import { addNotePedagogique } from "@/store/features/encadrant/encadrantSlice";
import { usePopup } from "@/hooks/usePopup";

export default function EditStageComp({ stage }) {
    const { user } = useSelector((state) => state.auth);
    const { closePopup } = usePopup();
    const { isLoading: noteEvalLoading } = useSelector(state => state.entreprise);
    const { isLoading: notePedaLoading } = useSelector(state => state.encadrant);
    
    const [note, setNote] = useState(
        user.role === 'entreprise' ? stage.note_evaluation : 
        user.role === 'encadrant' ? stage.note_pedagogique : 0
    );

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
            toast.error(err?.message || "Erreur lors de l'enregistrement");
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
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium capitalize">
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
                {(user?.role === 'entreprise' || user?.role === 'encadrant') && (
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

                {/* Score Summary: Displaying BOTH notes and the Final average */}
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

            {user.role !== 'etudiant' && (
                <div className="flex justify-end pt-2">
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
                </div>
            )}
        </div>
    );
}